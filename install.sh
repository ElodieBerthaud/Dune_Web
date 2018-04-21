#!/bin/sh

eval "curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -"
eval "sudo apt-get install -y nodejs"
eval "sudo npm install node"
eval "sudo npm install --save react react-dom"
eval "sudo npm install --save webpack webpack-dev-server"
eval "sudo npm install --save-dev babel-cli babel-core babel-loader babel-plugin-transform-object-rest-spread babel-preset-es2015 babel-preset-react babel-preset-stage-0 babel-register"
eval "sudo npm install --save-dev style-loader css-loader less-loader"
eval "sudo npm install --save-dev less"
eval "sudo npm link webpack"
