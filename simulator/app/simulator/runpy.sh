#!/bin/bash

# Check if the argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <paht-to-script>"
  exit 1
fi

script=$1
echo $script
docker exec app-python-1 python3 $script
