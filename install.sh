#!/bin/sh

if ! command -v deno &> /dev/null
then
    echo 'Please make sure that Deno is installed and added to your $PATH before installing Chomp'
    echo 'https://deno.land/#installation'
    exit
fi
deno install --allow-all --no-check --unstable --reload --force https://cdn.jsdelivr.net/gh/slymax/chomp/chomp.js
