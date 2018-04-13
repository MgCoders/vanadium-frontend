#!/usr/bin/env bash
#/bin/bash
set -x
$(aws ecr get-login --region us-east-1  | sed 's/\-e none//g')
docker stack deploy --compose-file=/home/ubuntu/vanadium-frontend-deploy/docker-compose.testing.yml vanadium-frontend --with-registry-auth

