---
sidebar_position: 1
---

# Set Up Environment

This guide explains how to set up a local development environment for Planka using either a traditional Node.js setup or Docker-based approach.

## Cloning the Repository

Start by cloning the Planka repository and installing dependencies:

```bash
git clone https://github.com/plankanban/planka.git
cd planka
npm install
```

## Traditional Development Setup

### Setting Up the Database

You can use a local PostgreSQL database or start the provided development database using Docker:

```bash
docker-compose -f docker-compose-db.yml up
```

### Configuring Environment Variables

Create a `.env` file in the `server/` directory based on the sample:

```bash
cp server/.env.sample server/.env
```

Edit `server/.env`:

- Set `DATABASE_URL` to your local or Docker database instance.
- Optionally configure `DEFAULT_ADMIN_*` variables to define an initial admin user.

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

This setup uses Docker Compose to run all services (client, server, database, proxy) and auto-reloads on file changes.

### Start the Full Stack Dev Environment

```bash
docker-compose -f docker-compose-dev.yml up
```

> This will build and start all required services in development mode.

### Environment Variables

Make sure the following environment variables are defined (can be passed via `.env` or Compose config):

```env
NODE_ENV=development
DEFAULT_ADMIN_EMAIL=demo@demo.demo
DEFAULT_ADMIN_PASSWORD=demo
DEFAULT_ADMIN_NAME=Demo Demo
DEFAULT_ADMIN_USERNAME=demo
```

### Access Planka

Once started, access Planka in your browser at `http://localhost:3000`

If ports conflict with existing services, modify `docker-compose-dev.yml` to use alternative ports.
