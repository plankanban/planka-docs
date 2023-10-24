---
sidebar_position: 98
---
# Development
Clone the repository and install dependencies:

```
git clone https://github.com/plankanban/planka.git

cd planka
npm install
```

Either use a local database or start the provided development database:

```
docker-compose -f docker-compose-db.yml up
```

Create `server/.env` based on `server/.env.sample` and edit `DATABASE_URL` if needed.\
Uncomment and edit `DEFAULT_ADMIN_*` variables if you need an initial administrator account.

Then initialize the database:

```
npm run server:db:init
```

Start the development server:

```
npm start
```
