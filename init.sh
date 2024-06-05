#!/bin/sh
{   
    cd $HOME/projects/elegram
    nohup yarn start > output.log 2>&1 &
}|| {
    notsify-send "Error" "Failed to start the app"
}