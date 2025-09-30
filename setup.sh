#!/bin/bash

echo "🚀 Kissan Backend Setup Start ho raha hai..."

# Step 1: Update system
sudo apt update && sudo apt upgrade -y

# Step 2: Node.js + npm install
sudo apt install -y nodejs npm

# Step 3: MongoDB install
sudo apt install -y mongodb

# Step 4: MongoDB data folder bna
sudo mkdir -p /data/db
sudo chown -R $(whoami) /data/db

# Step 5: Dependencies install
cd ~/kissan-backend || exit
npm install

# Step 6: .env file bna (agar already nahi hai)
if [ ! -f .env ]; then
cat <<EOT >> .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kissan
JWT_SECRET=supersecret
EOT
fi

echo "✅ Setup complete!"
echo "👉 Ab 2 terminal open kar:"
echo "   1) Pehle terminal me chalaye: mongod --dbpath /data/db --bind_ip_all"
echo "   2) Dusre terminal me chalaye: cd ~/kissan-backend && npm start"

