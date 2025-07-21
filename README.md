# IMF Gadget API

A secure REST API for managing Impossible Missions Force (IMF) gadgets, built with Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM.

## Features
- **Gadget Inventory Management**
  - List all gadgets with a random mission success probability
  - Add new gadgets with unique, randomly generated codenames
  - Update gadget information
  - Decommission gadgets (soft delete with timestamp)
  - Trigger a self-destruct sequence for gadgets (with confirmation code)
- **Authentication & Authorization**
  - JWT-based authentication protects all endpoints
- **API Documentation**
  - Interactive Swagger UI at `/docs`
- **Bonus**
  - Filter gadgets by status (e.g., `/gadgets?status=Available`)

## Data Model
- **Gadgets**
  - `id` (UUID)
  - `name` (string)
  - `status` ("Available", "Deployed", "Destroyed", "Decommissioned")
  - `decommissionedAt` (timestamp, nullable)

## Endpoints

### Auth
- `POST /auth/login` — Get a JWT token (see below for usage)

### Gadgets
- `GET /gadgets` — List all gadgets (optionally filter by status)
- `POST /gadgets` — Add a new gadget
- `PATCH /gadgets/:id` — Update a gadget
- `DELETE /gadgets/:id` — Decommission a gadget
- `POST /gadgets/:id/self-destruct` — Trigger self-destruct sequence

## How to Run Locally

### 1. Clone the repository
```sh
git clone https://github.com/BerrySeriousCoder/IMF-Gadget-API-Development-assignment.git
cd backendassignment
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up PostgreSQL
You can use Docker:
```sh
docker run --name learning-postgres -e POSTGRES_USER=johndoe -e POSTGRES_PASSWORD=randompassword -e POSTGRES_DB=mydb -p 5432:5432 -v instabackend-pgdata:/var/lib/postgresql/data -d postgres
```

### 4. Configure environment variables
Create a `.env` file in the project root:
```
DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb
JWT_SECRET=supersecretkey
PORT=3000
```

### 5. Run migrations
```sh
npx drizzle-kit push
```

### 6. Start the server
```sh
npm run dev
```

## How to Test Locally

### 1. Get an Auth Token
Use this curl command to get a JWT token:
```sh
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"agent","password":"imf123"}'
```
Copy the `token` value from the response.

### 2. Use Swagger UI
- Open [http://localhost:3000/docs](http://localhost:3000/docs) in your browser.
- Click the green **Authorize** button.
- Paste your token (no `Bearer` prefix needed) and click **Authorize**.
- Now you can test all endpoints interactively!

---

## Submission
- GitHub repository link: `https://github.com/BerrySeriousCoder/IMF-Gadget-API-Development-assignment.git`
- Live API link: `https://imfagent.onrender.com`
- Swagger docs: `/docs` on your deployed API

---

**Good luck, agent!** 
