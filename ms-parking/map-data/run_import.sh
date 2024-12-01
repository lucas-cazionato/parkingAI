#!/bin/bash

# Set the OSM file to the first argument, or default to "data.osm" if no argument is provided
OSM_FILE=${1:-map.osm}


docker compose run -v $(pwd)/map-data:/data osm2pgsql \
 -d osm \
 -U osmuser \
 -H postgis \
 -P 5432 \
 -c -k /data/"$OSM_FILE"