#!/bin/bash

read_var() {
    VAR=$(grep "^$1=" $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    IFS=" "
    echo "${VAR[1]}"
}

rm -rf public/index.html
cp public/tmpl.html public/index.html

sed -i"" -e "s%META_SITE_FAVICON%$(read_var SITE_FAVICON .metatags)%g" public/index.html
sed -i"" -e "s%META_SITE_TITLE%$(read_var SITE_TITLE .metatags)%g" public/index.html
sed -i"" -e "s%META_SITE_DESCRIPTION%$(read_var SITE_DESCRIPTION .metatags)%g" public/index.html
sed -i"" -e "s%META_SITE_KEYWORDS%$(read_var SITE_KEYWORDS .metatags)%g" public/index.html
sed -i"" -e "s%META_SITE_URL%$(read_var SITE_URL .metatags)%g" public/index.html
sed -i"" -e "s%META_SITE_IMAGE%$(read_var SITE_IMAGE .metatags)%g" public/index.html
sed -i"" -e "s%META_FB_APPID%$(read_var FB_APPID .metatags)%g" public/index.html
