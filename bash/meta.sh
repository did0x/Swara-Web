#!/bin/bash

read_var() {
    VAR=$(grep "^$1=" $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    IFS=" "
    echo "${VAR[1]}"
}

sed -i"" -e "s%META_SITE_FAVICON%$(read_var SITE_FAVICON .metatags)%g" build/index.html
sed -i"" -e "s%META_SITE_TITLE%$(read_var SITE_TITLE .metatags)%g" build/index.html
sed -i"" -e "s%META_SITE_DESCRIPTION%$(read_var SITE_DESCRIPTION .metatags)%g" build/index.html
sed -i"" -e "s%META_SITE_KEYWORDS%$(read_var SITE_KEYWORDS .metatags)%g" build/index.html
sed -i"" -e "s%META_SITE_URL%$(read_var SITE_URL .metatags)%g" build/index.html
sed -i"" -e "s%META_SITE_IMAGE%$(read_var SITE_IMAGE .metatags)%g" build/index.html
sed -i"" -e "s%META_FB_APPID%$(read_var FB_APPID .metatags)%g" build/index.html
