# Check arguments
if [ "$#" -ne 1 ]; then
  echo "Error: require ethernet device name as argument."
  exit 1
fi

# Prepare settings.json
mv ./sample_settings.json ./settings.json

# Clone Vulcan and strip .git
git clone https://github.com/VulcanJS/Vulcan.git
rsync -rv --exclude=.git ./Vulcan/ ./
rm -rf ./Vulcan

# Deactivate default Vulcan example
sed -i '/example-simple/d' .meteor/packages

# Activate chooy
sed -i '$a chooy' .meteor/packages

# Set ROOT_URL for Meteor & graphql
ip=$(ip -o -4 addr list $1 | awk '{print $4}' | cut -d/ -f1)
export ROOT_URL=http://$ip:3000
env | grep ROOT

# NPM module install
meteor npm install

# Startup
meteor npm start
