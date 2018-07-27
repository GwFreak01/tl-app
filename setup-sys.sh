#!/bin/sh

cd /tmp/
rm master.zip
wget https://github.com/GwFreak01/tl-app/archive/master.zip
unzip master.zip
rm master.zip

mv -f tl-app-master/* /home/tl/Documents/tl-app
rm -rf tl-app-master
ng build --prod --build-optimizer

read -p "Press [Enter] key to end..."

$SHELL

