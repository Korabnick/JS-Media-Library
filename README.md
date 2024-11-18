

Запуск:

```bash
npm init -y
```

```bash
npm install express pg sequelize dotenv bcryptjs jsonwebtoken body-parser ejs middleware express-session sequelize-cli bcrypt
```

```bash
npx sequelize-cli init
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
npx sequelize-cli db:create
```

Добавление админа с именем и паролем "admin" и пользователя с именем и паролем "moderator" в базу данных:
```bash
node .\createAdmin.js
```

Запуск сервера:
```bash
node .\server.js
```

Для сброса данных в базе данных:
```bash
npx sequelize-cli db:drop
```
```bash
npx sequelize-cli db:create
```
