#!/bin/sh
psql -p $1 $2 << EOF
INSERT INTO Pricing (username, pricing) VALUES($3, '{
"1": {"name": "morphodita", "value": 1},
"2": {"name": "PDT-Vallex", "value": 1},
"3": {"name": "EngVallex", "value": 1},
"4": {"name": "moses", "value": 1},
"5": {"name": "pmltq", "value": 1},
"6": {"name": "korektor", "value": 1},
"7": {"name": "parsito", "value": 1},
"8": {"name": "nametag", "value": 1}
}');
\q
EOF