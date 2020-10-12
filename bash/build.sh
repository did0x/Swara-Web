#!/bin/bash

if [[ $1 == 'master' ]]; then
    npm run build:prod
else
    npm run build:stage
fi