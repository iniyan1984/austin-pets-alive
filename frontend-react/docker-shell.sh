set -e

export IMAGE_NAME="homeless-pet-app-frontend-react"

docker build -t $IMAGE_NAME -f Dockerfile.dev .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 3000:3000 $IMAGE_NAME


# wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1RVUq_tjXaqMoMFRPTjM_T89c4SPDjTVK' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1RVUq_tjXaqMoMFRPTjM_T89c4SPDjTVK" -O download.zip && rm -rf /tmp/cookies.txt