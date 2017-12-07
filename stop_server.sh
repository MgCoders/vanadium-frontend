#!/usr/bin/env bash
#/bin/bash
set -x

echo cd sulfur-frontend-deploy en home
cd /home/ubuntu/sulfur-frontend-deploy
echo docker-compose kill
docker-compose -f docker-compose.production.yml kill
