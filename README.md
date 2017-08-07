[![Build Status](https://travis-ci.org/ufal/lindat-billing.svg?branch=master)](https://travis-ci.org/ufal/lindat-billing)

## Installation

1. clone
2. install ...
3. create database in postgres
4. ...

## Development

### Logging

To see debug logs define ```DEBUG=*``` environmental variable.



## Other tools

### pre-commit

Install pre-commit (http://pre-commit.com/) and execute
```
pre-commit install
```

### lint

Run and fix
```
npm run lint
```

# Deployment

## ufal-point-dev

Initial:
1. create new user (node), copy ssh keys
2. ``` pm2 deploy pm2.json ufal-point-dev setup ```
3. ``` pm2 deploy pm2.json ufal-point-dev ```
4. create database and secrets file or ENV variables
5. setup proxy, careful with '/' at the end, expecting relative paths to node



# Notes on running

## Environmental variables

The following environmental variables are recommended to be set before running the code.

```
LB_DB_HOST=databasehost
LB_DB_USER=username
LB_DB_PASS=password
LB_DB_PORT=databaseport
LB_DB_NAME=databasename
INPUT_LOGS_PATH=pathtoinput
SECRETS_FILE_PATH=pathtosecretsfile
RESET_LOGS=true / false
```

An easy way to do so is include them in exactly this manner in a `.env` file in the main project directory.
