---
sidebar_position: 1
---

# Set Up Environment

This guide explains how to set up a local development environment for PLANKA using either a traditional Node.js setup or Docker-based approach.

## Cloning the Repository

Start by cloning the PLANKA repository:

```bash
git clone https://github.com/plankanban/planka.git
```

## Traditional Development Setup

### Install dependencies

First, install the required dependencies:

```bash
cd planka
npm install
```

### Configuring Environment Variables

Create a `.env` file in the `server/` directory based on the sample:

```bash
cp server/.env.sample server/.env
```

Edit `server/.env`:

- Set `DATABASE_URL` to your local database instance.
- Сonfigure `DEFAULT_ADMIN_*` variables to define an initial admin user.

### Initializing the Database

Run the following command to initialize the database:

```bash
npm run server:db:init
```

### Starting the Development Server

To launch both the frontend and backend in development mode:

```bash
npm start
```

## Docker-Based Development Setup

This setup uses Docker Compose to run all services (client, server, database) and auto-reloads on file changes.

### Clean Workspace Requirement

Make sure there are no already installed dependencies (`node_modules` or `.venv` directories), since they should be installed via Docker. Otherwise, this can lead to `Segmentation fault` errors due to Node.js/Python version mismatches.

If you already have them, remove them first:

```bash
rm -rf node_modules client/node_modules server/node_modules server/.venv
```

### Configuring Environment Variables

Create a `.env` file in the `server/` directory based on the sample:

```bash
cp server/.env.sample server/.env
```

Edit `server/.env`:

- Сonfigure `DEFAULT_ADMIN_*` variables to define an initial admin user.

### Start the Full Stack Dev Environment

```bash
docker compose -f docker-compose-dev.yml up
```

> This will build and start all required services in development mode.

## Access PLANKA

Once started, access PLANKA in your browser at `http://localhost:3000`.
