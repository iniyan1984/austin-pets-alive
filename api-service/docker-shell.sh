#!/bin/bash

# exit immediately if a command exits with a non-zero status
set -e

# Define some environment variables
# Automatic export to the environment of subsequently executed commands
# source: the command 'help export' run in Terminal
export IMAGE_NAME="homeless-pet-app-api-service-test"
export BASE_DIR=$(pwd)
export PERSISTENT_DIR=$(pwd)/../persistent-folder/
# export SECRETS_DIR=$(pwd)/../secrets/
# export GCP_PROJECT="ai5-project"
# export GCP_ZONE="us-central1-a"
# export GOOGLE_APPLICATION_CREDENTIALS=/secrets/bucket-reader.json

# Build the image based on the Dockerfile
docker build -t $IMAGE_NAME -f Dockerfile .

# Run the container
# --mount: Attach a filesystem mount to the container
# -p: Publish a container's port(s) to the host (host_port: container_port) (source: https://dockerlabs.collabnix.com/intermediate/networking/ExposingContainerPort.html)
docker run --rm --name $IMAGE_NAME -ti \
--mount type=bind,source="$BASE_DIR",target=/app \
--mount type=bind,source="$PERSISTENT_DIR",target=/persistent \
-p 8000:8000 \
-e DEV=1  $IMAGE_NAME
# -e GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS \
# -e GCP_PROJECT=$GCP_PROJECT \
# -e GCP_ZONE=$GCP_ZONE \

# --network mushroomappnetwork $IMAGE_NAME


# docker run --rm --name homeless-pet-app-api-service -ti --mount type=bind,source="%cd%",target=/app --mount type=bind,source="%cd%/../persistent-folder/",target=/persistent -p 8000:8000 -e DEV=1  homeless-pet-app-api-service
# --mount type=bind,source="$SECRETS_DIR",target=/secrets \