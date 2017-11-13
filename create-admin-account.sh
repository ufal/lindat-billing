#!/bin/sh
psql -p 5433 lindat-billing-test << EOF
INSERT INTO Accounts (username, pass, admin) VALUES($1, crypt($2, gen_salt('bf')), true);
\q
EOF