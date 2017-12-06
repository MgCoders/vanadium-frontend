#!/usr/bin/env bash
#/bin/bash
set -x
echo Logging in to Amazon ECR...
$(aws ecr get-login --region $AWS_DEFAULT_REGION)
echo cd sulfur-frontend-deploy en home
cd /home/ubuntu/sulfur-frontend-deploy
cp ../conf/sulfur-frontend-deploy.env /home/ubuntu/sulfur-frontend-deploy/.env
echo docker-compose up
docker-compose -f docker-compose.production.yml build && docker-compose -f docker-compose.production.yml up -d
