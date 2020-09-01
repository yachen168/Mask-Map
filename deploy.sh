set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:yachen168/Mask-Map.git master:gh-pages

cd -