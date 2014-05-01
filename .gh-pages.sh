#!/bin/sh
rm -rf *
cp -r ../malhar-dashboard-webapp/dist/ .
git add -A
git commit -m "demo"
git push origin gh-pages
