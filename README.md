# KitNet Fácil - Sistema de Aluguel de Kitnets

Sistema moderno de aluguel de kitnets focado em **confiança**, **facilidade de busca** e **agilidade**.

## Como rodar

```bash
npm install
npm run dev
```

Isso inicia o **frontend** (http://localhost:5173) e o **backend** (http://localhost:3001) juntos.

Para rodar separadamente:
- `npm run dev:client` — só o frontend
- `npm run dev:server` — só a API

## Funcionalidades

### 1. Filtros Inteligentes
- **Contas inclusas** (água, luz, gás, internet) – maior diferencial
- **Mobiliado ou vazio** – para quem está mudando só com as malas
- **Proximidade** – universidades e metrô
- **Aceita Pet** – evita perder tempo com locais que proíbem

### 2. Experiência Visual Imersiva
- **Galeria de fotos** – ângulos abertos para visualizar o espaço
- **Tour em vídeo** – entendimento melhor da disposição
- **Planta baixa humanizada** – cama, guarda-roupa e mesa de trabalho

### 3. Transparência e Agilidade
- **Agendamento online** – calendário para escolher dia e hora da visita
- **Chat direto** – dúvidas rápidas (regras, silêncio, fumo, etc.)
- **Calculadora de custo total** – aluguel + condomínio + IPTU + contas

### 4. Geolocalização e Vizinhança
- **Mapa interativo** – OpenStreetMap com localização exata
- **Links para Google Maps e Street View** – conferir a rua e arredores

### 5. Facilidade Burocrática (placeholders)
- Análise de crédito rápida (sem fiador tradicional)
- Assinatura digital de contrato

## Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Leaflet (mapas)
