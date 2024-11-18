

Запуск:

```bash
npm init -y
```

```bash
npm install express pg sequelize dotenv bcryptjs jsonwebtoken body-parser ejs middleware express-session sequelize-cli
```

```bash
npx sequelize-cli init
```

```bash
npx sequelize-cli migration:generate --name add-userId-to-mediaItems
```

```bash
docker run -d \
    --name trd2 \
    -e POSTGRES_USER=trdadmin \
    -e POSTGRES_PASSWORD=test \
    -e PGDATA=/postgres_data_inside_container \
    -v ~/my_flask_project/postgres_data:/postgres_data_inside_container \
    -p 38760:5432 \
    postgres:15.1
```

```bash
docker run -d --name medialibrary -e POSTGRES_USER=mediaadmin -e POSTGRES_PASSWORD=test -e PGDATA=/postgres_data_inside_container -v ~/my_js_project/postgres_data:/postgres_data_inside_container -p 38000:5432 postgres:15.1
```

```bash
1. docker exec -it medialibrary psql -U mediaadmin

2. CREATE DATABASE medialibrary;
```

docker run -d --name medialibrary -e POSTGRES_USER=mediaadmin -e POSTGRES_PASSWORD=test -e PGDATA=/postgres_data_inside_container -v C:/Users/qq/Documents/my_flask_project/postgres_data:/postgres_data_inside_container -p 38000:5432 postgres:15.1