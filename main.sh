if (docker network create hw02_network); then
    echo "network hw02_network is created"
else
    echo "error when create hw02_network created1"
fi
if (docker volume create servervol); then
    echo "volume servervol is created"
else
    echo "error when create servervol!"
fi
echo "---------------"
if (docker volume create clientvol); then
    echo "volume clientvol is created"
else
    echo "error when create clientvol!"
fi

cd ./client
sh fileClient.sh
cd ..
cd server
sh fileServer.sh
