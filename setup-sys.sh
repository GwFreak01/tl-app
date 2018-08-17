#!/bin/sh

# Local Server Deployment
# Make sure emails.js mailing server is config to internal mailing server
# rather than Mailgun (DEV)

#
killall node
killall python
cd /tmp/
wget https://github.com/GwFreak01/tl-app/archive/master.zip
unzip master.zip
rm master.zip

cp -rf tl-app-master/* /home/tl/Documents/tl-app
rm -rf tl-app-master

cd /home/tl/Documents/tl-app/

if ng build --prod --build-optimizer; then
  echo "success"
else

# Enable if there is an error
  exec sh;
fi

