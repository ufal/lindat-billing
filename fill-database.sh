#!/bin/sh
psql -p 5433 -q -v "ON_ERROR_STOP=1" lindat-billing-test << EOF

INSERT INTO Accounts (username, pass, admin) VALUES('david', crypt('heslo', gen_salt('bf')), true);
INSERT INTO Accounts (username, pass, admin) VALUES('jm', crypt('heslo', gen_salt('bf')), true);

INSERT INTO Accounts (username, pass, admin) VALUES('user', crypt('heslo', gen_salt('bf')), false);
INSERT INTO Accounts (username, pass, admin) VALUES('honza', crypt('heslo', gen_salt('bf')), false);
INSERT INTO Accounts (username, pass, admin) VALUES('johny', crypt('heslo', gen_salt('bf')), false);


INSERT INTO Logins VALUES('user', '1502809718020');
INSERT INTO Logins VALUES('user', '1502809718021');
INSERT INTO Logins VALUES('user', '1502809718022');
INSERT INTO Logins VALUES('honza', '1502809718025');


INSERT INTO Users (id_u,ip,owner) VALUES('1','127.0.0.1'::inet, 'user');
INSERT INTO Users (id_u,ip,owner) VALUES('2','127.0.0.2'::inet, 'user');
INSERT INTO Users (id_u,ip,owner) VALUES('3','127.0.0.10'::inet, 'honza');
INSERT INTO Users (id_u,ip,owner) VALUES('4','127.0.0.11'::inet, 'honza');
INSERT INTO Users (id_u,ip,owner) VALUES('5','127.0.0.12'::inet, 'honza');
INSERT INTO Users (id_u,ip,owner) VALUES('6','127.0.0.20'::inet, 'johny');
INSERT INTO Users (id_u,ip,owner) VALUES('7','127.0.0.21'::inet, 'johny');


\q
EOF

if [ $? -gt 0 ];
then "Error in database filling"
else
    echo "Database is filled with test data"
fi