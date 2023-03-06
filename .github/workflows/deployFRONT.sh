#!/bin/bash

# prune docker
docker stop $(docker ps --filter status=running --filter name=front -q)
docker rm -f $(docker ps --filter status=exited -q)
docker rmi -f $(docker images front* -q)
docker image prune -f

# prepare new deployment folder
mv titi-voyance-front/ oldTiti-voyance-front/
git clone git@github.com:gnos28/titi-voyance-front.git
cd titi-voyance-front/
git pull -f --rebase origin main

# récupérer les .env uploadés précédemment avec scp et les déplacer ici
mv ../dotenv/.env.frontend front/.env.local

# build docker images
docker compose -f docker-compose.prod.yml build --no-cache

# start container
docker compose -f docker-compose.prod.yml up >~/logs/log.compose.front.$(date +"%s") 2>&1 &
disown

# delete old folder
sudo rm -Rf ~/oldTiti-voyance-front/

# build next.js
# docker exec -i $(docker ps --filter status=running --filter name=front -q) buildFRONT.sh >~/logs/log.build.front.$(date +"%s") 2>&1

# build next.js
# docker exec -i $(docker ps --filter status=running --filter name=front -q) next start >~/logs/log.build.front.$(date +"%s") 2>&1 &
# disown
