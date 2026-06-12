# Ecommerce de Relógios

Aplicação web de e-commerce desenvolvida como projeto de fim de curso, focada na venda de relógios.

## Tecnologias utilizadas

**Frontend:** React, React Router DOM, Tailwind CSS, i18next  
**Backend:** Node.js, Express  
**Base de dados:** MySQL  

## Funcionalidades

- Catálogo de produtos com filtragem por categoria, coleção e género
- Página de produto com seleção de tamanho
- Carrinho de compras e lista de desejos
- Processo de checkout com morada de entrega
- Autenticação com registo e login
- Página de perfil do utilizador com histórico de encomendas
- Suporte a múltiplos idiomas (PT, EN, ES, FR, DE)
- Painel de administrador para gestão de produtos, utilizadores e encomendas

## Como correr localmente

### Pré-requisitos
- Node.js
- XAMPP (MySQL)

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd api
npm install
npm run dev
```

### Base de dados
Importar o ficheiro `ecommerce_db.sql` no phpMyAdmin e configurar o ficheiro `.env` na pasta `api` com base no `.env.example`.