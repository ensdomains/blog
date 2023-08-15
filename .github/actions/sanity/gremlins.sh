#!/bin/bash

output=$(grep -r --exclude-dir=node_modules '[“”‘’]' --include='*.mdx' --include='*.json' ./)

if [[ -n "$output" ]]; then
    echo "Error: Invalid quotation marks found, this might be because this text was written in a word processing software. Try using \" or ' instead of “” and ‘’ :"
    echo "$output"
    exit 1
fi
