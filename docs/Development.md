# Development Setup for Planka

## Cloning the Repository

To get started, clone the Planka repository and install the required dependencies:

```bash
git clone https://github.com/plankanban/planka.git
cd planka
npm install
```

## Traditional Development Setup

### Setting Up the Database

You can either use a local database or start the provided development database with Docker:

```bash
docker-compose -f docker-compose-db.yml up
```

### Configure Environment Variables

Create `server/.env` based on `server/.env.sample` and edit the `DATABASE_URL` to point to your database. Uncomment and configure the `DEFAULT_ADMIN_*` variables if you need an initial administrator account.

### Initialize the Database

Run the following command to initialize your database:

```bash
npm run server:db:init
```

### Start the Development Server

Start your development server:

```bash
npm start
```

## Docker-Based Development Setup

To simplify the setup and streamline development, you can use the Docker environment that orchestrates all necessary services and dependencies. This setup ensures that the code is updated automatically within the container for rapid feedback on changes.

### Start the Complete Development Environment

Start the complete development environment with:

```bash
docker-compose -f docker-compose-dev.yml up
```

This command will build and start all required services, including the server, client, database, and proxy.

### Environment Variables

Ensure the following environment variables are set in your Docker configuration:

- `NODE_ENV=development` for all services to run in the development mode.
- `DEFAULT_ADMIN_EMAIL=demo@demo.demo` - Email address for the admin account.
- `DEFAULT_ADMIN_PASSWORD=demo` - Password for the admin account.
- `DEFAULT_ADMIN_NAME=Demo Demo` - Full name of the admin.
- `DEFAULT_ADMIN_USERNAME=demo` - Username for the admin login.

### Accessing the Application

Once the Docker containers are up and running, the client can be accessed at `http://localhost:3000`, and the API server will also be available at this URL.

Make sure the ports in the Docker configurations do not conflict with any other services on your machine. Adjust the `docker-compose-dev.yml` as needed.
