#!/bin/bash
set -e

# Create user and database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER osmuser WITH PASSWORD 'osmpass';
    CREATE DATABASE osm WITH OWNER osmuser ENCODING 'UTF8';
EOSQL

# Enable PostGIS and HStore extensions
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=osm <<-EOSQL
    CREATE EXTENSION postgis;
    CREATE EXTENSION hstore;
EOSQL

# Create table "parking_timeline" if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=osm <<-EOSQL
    CREATE TABLE IF NOT EXISTS parking_timeline (
        id SERIAL PRIMARY KEY,
        osm_id BIGINT,
        parking_type VARCHAR(255),
        way_area NUMERIC(15,4),
        capacity INTEGER,
        occupied INTEGER,
        is_holiday INTEGER, 
        update_time TIMESTAMP
    );
EOSQL

# Grant CRUD privileges to osmuser
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=osm <<-EOSQL
    GRANT SELECT, INSERT, DELETE, UPDATE ON TABLE parking_timeline to osmuser;
    GRANT USAGE, SELECT, UPDATE ON TABLE parking_timeline_id_seq to osmuser;
EOSQL
