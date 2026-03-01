import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import PropertyPage from './pages/PropertyPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FavoritosPage from './pages/FavoritosPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kitnets" element={<ListingPage />} />
        <Route path="/kitnet/:id" element={<PropertyPage />} />
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/favoritos" element={<ProtectedRoute><FavoritosPage /></ProtectedRoute>} />
      </Routes>
    </Layout>
  )
}

export default App
