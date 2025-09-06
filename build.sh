#!/bin/sh
SHORT_COMMIT_SHA=${1:-"unknown"}
mkdir -p /root/.docker
cp /buildkit-docker-secret/.dockerconfigjson /root/.docker/config.json
buildctl-daemonless.sh build --frontend dockerfile.v0 --local context=. --local dockerfile=. --output type=image,name=cr.yandex/crp693tpitbsr9og94q7/my-playwright-tests:${DRONE_COMMIT_SHA:0:7},push=true