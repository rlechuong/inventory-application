# Inventory Application

https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application

## Live Demo

**[Link](https://inventory-application-production-7b84.up.railway.app)**

## Features

- Browse games by genre and platform
- Full CRUD for games, genres, and platforms
- Many-to-many relationships between games, genres, and platforms
- Form validation with express-validator
- Admin password protection for destructive actions
- 404 error handling with custom error class

## Tech Stack

- **Runtime:** Node.js v22
- **Framework:** Express v5
- **Database:** PostgreSQL
- **Templating:** EJS
- **Deployment:** Railway
- **Styling:** Custom CSS

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository

```bash
   git clone https://github.com/rlechuong/inventory-application.git
   cd inventory-application
```

2. Install dependencies

```bash
   npm install
```

3. Create an `.env` file based on `.env.example`

```bash
   cp .env.example .env
```

4. Fill in your environment variables in `.env`

5. Set up the database

```bash
   psql -d your_database_name -f src/db/schema.sql
```

6. Seed the database

```bash
   node src/db/populatedb.js
```

7. Start the development server

```bash
   npm run dev
```

## Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `DATABASE_URL`   | PostgreSQL Connection String      |
| `PORT`           | Server Port (Default: 3000)       |
| `ADMIN_PASSWORD` | For Edit/Delete Actions           |

## Database Schema

- **games** — title, developer, publisher, release_date, price, stock, cover_image_url, description
- **genres** — name
- **platforms** — name
- **game_genres** — join table linking games and genres
- **game_platforms** — join table linking games and platforms

## Future Enhancements

- Context-aware back navigation
