# Afri Bid Starter

## Environment Setup

Run `cp env.example.txt .env`

## Project Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

### Json server

Before starting the server run `cp db.example.json db.json` then:

```bash
# npm
npm run start:db

# pnpm
pnpm run start:db

# yarn
yarn start:db

# bun
bun run start:db
```

### Frontend

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Tools Used

- **Frontend Framework**: [Nuxt.js](https://nuxt.com/)

- **UI Component Library**: [PrimeVue](https://nuxt.com/modules/primevue)

- **Styling Utility**: [Tailwind CSS](https://nuxt.com/modules/tailwindcss)

- **State Management**: [Pinia](https://nuxt.com/modules/pinia)

- **State Persistance**: [pinia-plugin-persistedstate](https://nuxt.com/modules/pinia-plugin-persistedstate)

- **Package Manager**: [pnpm](https://pnpm.io/installation)

- **Development Server**: [json-server](https://www.npmjs.com/package/json-server)

- **Utilities**: [VueUse](https://nuxt.com/modules/vueuse)

- **Auth**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Architecture

### Frontend (Nuxt.js)

- **Framework**: Nuxt.js (Vue.js-based)
- **Responsibilities**:
  - **Authentication & Authorization**: Handles user login, registration, and session management.
  - **CRUD Operations**: Performs Create, Read, Update, and Delete operations for the application’s resources.
  - **Client-Server Communication**: The Nuxt client sends requests to the Nuxt server for data handling and authentication-related tasks.

### Backend (Nuxt.js Server)

- **Role**: Middleware between the frontend and json-server.
- **Responsibilities**:
  - **Business Logic**: Manages user authentication, authorization, and CRUD operations.
  - **Data Communication**: Interacts with json-server to persist and retrieve data.

### Data Store (json-server.js)

- **Function**:
  - Acts as a lightweight REST API for data storage.
  - Receives requests only from the Nuxt.js server.
  - Stores resources such as users, product listing, and bid data.

### Data Flow

1. The **Nuxt.js client** communicates with the **Nuxt.js server** for application logic and data.
2. The **Nuxt.js server** authenticates and authorizes requests, then forwards data-related operations to **json-server.js**.
3. **json-server** processes and stores the data, responding to requests from the Nuxt.js server.
