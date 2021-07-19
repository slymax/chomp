#!/bin/sh

if ! command -v deno &> /dev/null
then
    echo 'Please make sure that Deno is installed and added to your $PATH before installing Chomp'
    echo 'https://deno.land/#installation'
    exit
fi
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check --unstable -r -f https://cdn.jsdelivr.net/gh/slymax/chomp/chomp.js
