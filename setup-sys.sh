#!/bin/sh

cd /home/tl/Downloads/

wget https://github.com/GwFreak01/tl-app/archive/master.zip
tar -xvf master.zip /tmp
rm master.zip

mv -f /tmp/tl-app/master/* /home/tl/Documents/tl-app

ng build --prod --build-optimizer
