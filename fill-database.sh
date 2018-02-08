#!/bin/sh
psql -p $1 -q -v $2 << EOF

INSERT INTO Accounts (username, pass, admin) VALUES('david', crypt('heslo', gen_salt('bf')), true);
INSERT INTO Accounts (username, pass, admin) VALUES('jm', crypt('heslo', gen_salt('bf')), true);

INSERT INTO Accounts (username, pass, admin) VALUES('user', crypt('heslo', gen_salt('bf')), false);
INSERT INTO Accounts (username, pass, admin) VALUES('honza', crypt('heslo', gen_salt('bf')), false);
INSERT INTO Accounts (username, pass, admin) VALUES('johny', crypt('heslo', gen_salt('bf')), false);


INSERT INTO Logins VALUES('user', '1502809718020');
INSERT INTO Logins VALUES('user', '1502809718021');
INSERT INTO Logins VALUES('user', '1502809718022');
INSERT INTO Logins VALUES('honza', '1502809718025');


INSERT INTO Users (ip,owner) VALUES('127.0.0.1', 'user');
INSERT INTO Users (ip,owner) VALUES('127.0.0.2', 'user');
INSERT INTO Users (ip,owner) VALUES('127.0.0.10', 'honza');
INSERT INTO Users (ip,owner) VALUES('127.0.0.11', 'honza');
INSERT INTO Users (ip,owner) VALUES('127.0.0.12', 'honza');
INSERT INTO Users (ip,owner) VALUES('127.0.0.20', 'johny');
INSERT INTO Users (ip,owner) VALUES('127.0.0.21', 'johny');


\q
EOF

echo "Database is filled with test data"