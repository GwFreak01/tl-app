#!/bin/sh

killall node
killall python
cd /tmp/
wget https://github.com/GwFreak01/tl-app/archive/master.zip
unzip master.zip
rm master.zip

cp -rf tl-app-master/* /home/tl/Documents/tl-app
rm -rf tl-app-master

cd /home/tl/Documents/tl-app/

ng build --prod --build-optimizer

# Enable if there is an error
#exec sh

