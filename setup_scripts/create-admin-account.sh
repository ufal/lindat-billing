#!/bin/sh
psql -p $1 $2 << EOF
INSERT INTO Accounts (username, pass, admin) VALUES($3, crypt($4, gen_salt('bf')), true);
\q
EOF