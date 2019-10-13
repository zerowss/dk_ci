#!/bin/bash
mongo <<EOF

use root;
db.createCollection("dk");

EOF
