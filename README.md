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
4. create database, secrets file or ENV variables
5. setup proxy


