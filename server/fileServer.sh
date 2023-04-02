echo "--------------------"
echo "build server image"
echo "--------------------"

docker build -t backend:dev .

cd ..

echo "--------------------"
echo "up mongodb with docker compose"
echo "---------------------"
docker compose up -d

cd ./server

echo "--------------------"
echo "run server image"
echo "---------------------"

docker run -d -p 4000:4000 --network hw02_network -v servervol:/app/serverdata -e MONGO_URI=mongodb://mongo-host:27017 -e PORT=4000 backend:dev
