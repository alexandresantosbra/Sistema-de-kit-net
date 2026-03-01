import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { join, dirname } from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
const __dirname = dirname(fileURLToPath(import.meta.url))
const JWT_SECRET = process.env.JWT_SECRET || 'kitnet-facil-secret-2026'

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

// Database
const dbPath = join(__dirname, 'db.json')
const adapter = new JSONFile(dbPath)
const db = new Low(adapter, { users: [], favorites: [] })
await db.read()
db.data = db.data || { users: [], favorites: [] }
if (!db.data.users) db.data.users = []
if (!db.data.favorites) db.data.favorites = []
await db.write()

// Kitnets - load from JSON
let kitnets = []
try {
  const kitnetsJson = readFileSync(join(__dirname, 'kitnets.json'), 'utf8')
  kitnets = JSON.parse(kitnetsJson)
} catch (e) {
  console.warn('kitnets.json não encontrado, lista vazia:', e.message)
}

// Auth middleware
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }
  try {
    const token = auth.slice(7)
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres' })
    }

    const exists = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      password: hash,
      name: name.trim(),
      createdAt: new Date().toISOString(),
    }
    db.data.users.push(user)
    db.data.favorites.push({ userId: user.id, kitnetIds: [] })
    await db.write()

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao cadastrar' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    const user = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.data.users.find(u => u.id === req.userId)
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' })
  }
  res.json({ user: { id: user.id, email: user.email, name: user.name } })
})

// Kitnets - serve from static JSON (frontend will fetch)
// We need to create kitnets.json from the TS data - I'll create it manually

// Favorites
app.get('/api/favorites', authMiddleware, (req, res) => {
  const fav = db.data.favorites.find(f => f.userId === req.userId)
  res.json({ kitnetIds: fav?.kitnetIds || [] })
})

app.post('/api/favorites', authMiddleware, (req, res) => {
  const { kitnetId } = req.body
  if (!kitnetId) {
    return res.status(400).json({ error: 'kitnetId é obrigatório' })
  }

  let fav = db.data.favorites.find(f => f.userId === req.userId)
  if (!fav) {
    fav = { userId: req.userId, kitnetIds: [] }
    db.data.favorites.push(fav)
  }
  if (!fav.kitnetIds.includes(kitnetId)) {
    fav.kitnetIds.push(kitnetId)
  }
  db.write()
  res.json({ kitnetIds: fav.kitnetIds })
})

app.delete('/api/favorites/:kitnetId', authMiddleware, (req, res) => {
  const fav = db.data.favorites.find(f => f.userId === req.userId)
  if (!fav) {
    return res.json({ kitnetIds: [] })
  }
  fav.kitnetIds = fav.kitnetIds.filter(id => id !== req.params.kitnetId)
  db.write()
  res.json({ kitnetIds: fav.kitnetIds })
})

app.get('/api/kitnets', (req, res) => {
  res.json({ kitnets })
})

app.get('/api/kitnets/:id', (req, res) => {
  const k = kitnets.find(kk => kk.id === req.params.id)
  if (!k) return res.status(404).json({ error: 'Kitnet não encontrada' })
  res.json(k)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})
