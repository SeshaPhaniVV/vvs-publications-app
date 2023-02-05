# Introduction

Publications App

# Getting Started

Follow the below instructions to get started with this project.

## Software Dependencies

- Docker

## Starting Server

Below modes will run

- backend-app, frontend-app postgres & redis inside docker containers.
- db migrations & seeds

```sh
# go to backend app
cd backend-app
# to build and run the containers
bash dev-env.sh init
# to stop and remove the containers
bash dev-env.sh down
# to stop the containers
bash dev-env.sh stop
# to start the container
bash dev-env.sh start
```

## Postman Collection for the apis

Postman Link [here](PublicatonsApp.postman_collection.json)

Front end server: `http://localhost:8000`
Backend Server: `http://localhost:3000`
