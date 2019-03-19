#!/bin/sh

set -xe

# Prepare an empty gh-pages directory
git clone git@github.com:SocieteNumerique/pass-numerique.git gh-pages
cd gh-pages
git checkout gh-pages
git rm -rf . || true

# Build the production files and copy them in the gh-pages directory
cd ..
PUBLIC_PATH=/pass-numerique yarn run prod
cp -a public/* gh-pages/

# Commit and push gh-pages branch
cd gh-pages
git add -A
git commit --allow-empty -m "Website built [CI skip]"
git push --force

cd ..
rm -rf gh-pages

echo "Deployed"
