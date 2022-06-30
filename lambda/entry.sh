#!/bin/bash
set -e

java -jar wiremock-jre8-standalone-2.33.2.jar --root-dir $WIREMOCK_CONFIG_DIR &

sleep 5
/usr/bin/npx aws-lambda-ric index.handle
