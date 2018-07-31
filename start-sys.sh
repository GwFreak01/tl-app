#!/bin/sh


# Install NodeJS 10+
# Install MongoDB 3.6.4+

# sudo apt-get install -y mate-terminal
# sudo npm install -g -y @angular/cli

#
killall node
killall python

mate-terminal --geometry=100x24+20+20 --zoom=1 --hide-menubar -e 'sh /home/tl/Documents/tl-app/Backend.sh' &
mate-terminal --geometry=100x24+20+400 --zoom=1 --hide-menubar -e 'sh /home/tl/Documents/tl-app/Frontend.sh' &



