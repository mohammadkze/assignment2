echo "--------------------"
echo "build client image"
echo "--------------------"

docker build -t client:dev .

echo "--------------------"
echo "run client image"
echo "---------------------"

docker run -d -p 5173:5173 --network hw02_network -v clientvol:/app/clientdata -e VITE_APP_SERVER=http://0.0.0.0:4000 client:dev
