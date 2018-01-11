#!/bin/sh
dropdb -p 5432 lindat-billing-test
createdb -p 5432 lindat-billing-test
psql -p 5432 -q -v "ON_ERROR_STOP=1" lindat-billing-test << EOF

CREATE SEQUENCE logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000000
    CACHE 1;

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000000
    CACHE 1;

CREATE TABLE Users
(
id_u bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
ip inet,
owner text,
CONSTRAINT users_pkey PRIMARY KEY (id_u)
);

CREATE TABLE Logs
(
id_l bigint NOT NULL DEFAULT nextval('logs_id_seq'::regclass),
id_u int,
id_s int,
datetime timestamp with time zone,
request text,
CONSTRAINT logs_pkey PRIMARY KEY (id_l)
);

CREATE TABLE Accounts
(
username text,
pass text,
admin boolean,
CONSTRAINT accounts_pkey PRIMARY KEY (username)
);

CREATE TABLE Logins
(
    username text,
    datetime bigint
);

\q
EOF
if [ $? -gt 0 ];
then "Error in database setup"
else
    echo "Database is set up"
    truncate -s 0 "./server/log_management/log-files.json"
    echo "{}" > "./server/log_management/log-files.json"
    echo "Log reading has been reset"
fi
