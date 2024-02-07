#!/bin/bash

# Deploy via le proxy
docker build -t bruno.chevre.gay .
docker run -d -e VIRTUAL_HOST=bruno.chevre.gay -e LETSENCRYPT_HOST=bruno.chevre.gay --network=proxy --rm --name bruno.chevre.gay bruno.chevre.gay
exit 0
