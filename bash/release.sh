#!/bin/bash

CHECKER=`git tag`
if [[ -z $CHECKER ]]; then
    VERSION="1.0.0"
else
    VERSION=`git describe --abbrev=0 --tags`
fi

sed -i"" -e "s/%RELEASE_VERSION%/$VERSION/g" build/index.html