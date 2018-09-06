#!/bin/sh


# Install NodeJS 10+
# Install MongoDB 3.6.4+

# sudo apt-get install -y mate-terminal
# sudo npm install -g -y @angular/cli

#
killall node
killall python

mate-terminal --geometry=75x24+20+20 --zoom=1 --hide-menubar -e 'sh /home/tl/Documents/tl-app/Backend.sh' &
mate-terminal --geometry=75x24+20+400 --zoom=1 --hide-menubar -e 'sh /home/tl/Documents/tl-app/Frontend.sh' &
mate-terminal --geometry=50x24+400+300 --zoom=1 --hide-menubar -e 'sh /home/tl/Documents/tl-app/BackupDB.sh' &



