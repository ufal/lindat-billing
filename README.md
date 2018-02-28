[![Build Status](https://travis-ci.org/ufal/lindat-billing.svg?branch=master)](https://travis-ci.org/ufal/lindat-billing)

## Installation

1. Clone the repository
2. Run ```npm install```
3. Create a database in postgres and update *database-setup.sh* accordingly
4. Make sure the database has the *pgcrypto* extension
5. Run ```database-setup.sh```
6. Either use a "secrets file" or environmental variables, see section [Configuration](#Configuration)
6. Run ```npm start```


## Configuration

### Environmental variables

If the database is run on the standard port 5432 on localhost, you 
need to configure only the following variables:

* ```LB_DB_USER``` - database username 
* ```LB_DB_PASS``` - database password 
* ```LB_DB_NAME``` - database name 

Further, the following environmental variables are *recommended* to be set before running the code.

```
LB_DB_HOST=databasehost
LB_DB_USER=username
LB_DB_PASS=password
LB_DB_PORT=databaseport
LB_DB_NAME=databasename
INPUT_LOGS_PATH=pathtoinput
SECRETS_FILE_PATH=pathtosecretsfile
RESET_LOGS=true / false
ACCESS_LOG_ONLY=true / false
```

An easy way to do so is include them in exactly this manner in a `.env` file in the main project directory.

## Secrets file

Secrets file offer an alternative to environmental variables described above. The path to the secrets file does not need to be specified unless it is used. If so, it has to be passed as an environmental variable named SECRETS_FILE_PATH.

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


## Additional scripts

**create-admin-account.sh**

Adds a new user with admin privileges.
```
sh create-admin-account.sh PORT DBNAME USERNAME PASSWORD
```
- _PORT_ The port where the database runs.
- _DBNAME_ Database name.
- _USERNAME_ Username to be added.
- _PASSWORD_ Password for the new admin.

**fill-database.sh**

Adds some user-related data do the database.
```
sh fill-database.sh PORT DBNAME
```
- _PORT_ The port where the database runs.
- _DBNAME_ Database name.
