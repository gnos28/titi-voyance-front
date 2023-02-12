#!/bin/bash

# prune docker
docker stop $(docker ps --filter status=running --filter name=titi-voyance -q)
docker rm -f $(docker ps --filter status=exited -q)
docker rmi -f $(docker images titi-voyance* -q)
docker image prune -f

# prepare new deployment folder
mv titi-voyance/ oldTiti-voyance/
git clone git@github.com:gnos28/titi-voyance.git
cd titi-voyance/
git pull -f --rebase origin dev

# récupérer les .env uploadés précédemment avec scp et les déplacer ici
mv ../dotenv/.env.frontend front/.env.local
mv ../dotenv/.env.backend back/.env
mv ../dotenv/auth.json back/auth.json

# build docker back images
docker compose -f docker-compose.prod.yml build back --no-cache

# start back container
docker compose -f docker-compose.prod.yml up back >~/logs/log.compose.back.$(date +"%s") 2>&1 &
disown

# build docker front images
docker compose -f docker-compose.prod.yml build front --no-cache

# start front container
docker compose -f docker-compose.prod.yml up front >~/logs/log.compose.front.$(date +"%s") 2>&1 &
disown

# delete old folder
sudo rm -Rf ~/oldTiti-voyance/
