#!/bin/sh

set -e
GH_REMOTE=$(git config remote.origin.url)

# Prepare an empty gh-pages directory
git clone git@github.com:SocieteNumerique/pass-numerique.git gh-pages
cd gh-pages
git rm -rf . || true

# Build the production files and copy them in the gh-pages directory
cd ..
yarn run prod
cp -a public/* gh-pages/
cd gh-pages

# Commit and push gh-pages branch
git add -A
git commit --allow-empty -m "Website built [CI skip]"
git push --force --quiet origin master

cd ..
rm -rf gh-pages

echo "Deployed"
