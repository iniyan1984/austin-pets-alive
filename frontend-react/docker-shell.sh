set -e

export IMAGE_NAME="homeless-pet-app-frontend-react"

docker build -t $IMAGE_NAME -f Dockerfile.dev .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 3000:3000 $IMAGE_NAME