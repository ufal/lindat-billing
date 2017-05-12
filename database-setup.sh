#!/bin/sh
dropdb -p 5433 lindat-billing-test
createdb -p 5433 lindat-billing-test
psql -p 5433 lindat-billing-test << EOF

CREATE SEQUENCE logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 10000000
    CACHE 1;

CREATE TABLE Users
(
id_u bigint NOT NULL DEFAULT nextval('logs_id_seq'::regclass),
ip inet,
CONSTRAINT users_pkey PRIMARY KEY (id_u)
);


CREATE TABLE Logs
(
id_l SERIAL PRIMARY KEY,
id_u int,
id_s int,
datetime timestamp with time zone,
request text,
CONSTRAINT logs_pkey PRIMARY KEY (id_l)
)

\q
EOF
echo "Database is set up"