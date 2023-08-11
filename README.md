# Trending repositories from GitHub Api

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development

#### Frontend

You should to run frontend using commands

```bash
cd frontend
npm i
npm start
```

You can open the development page on localhost:3000.

#### Backend

After that, in order for the project to open, you will need to go to the backend folder

```bash
cd ..
```

```bash
npm run dev
```

You can use api on `localhost:8080/api`.

### Production

#### Frontend

```bash
cd frontend
npm run build
cd ..
```

#### Backend

```bash
npm run start
```

Frontend will be available on `localhost`
BE API will be available on `localhost/api`

## CLI

```bash
npm run cli:install
```

Execute the script that is in src/setup-client.sh .Install cli script
After that, you could use this command to call the package manager

```bash
grepos start
grepos sync
grepos get <id>
```

To delete cli, you can use the command

```bash
npm run cli:uninstall
```
