#!/bin/bash
set -e

# 获取版本号和预发布标志
VERSION=$1
PRERELEASE=$2

# 检查是否提供了版本号
if [ -z "$VERSION" ]; then
  echo "Error: 版本号未提供"
  exit 1
fi

# 打印版本号和预发布标志
echo "准备发布版本: $VERSION"
if [ -n "$PRERELEASE" ]; then
  echo "这是一个预发布版本"
fi

# 更新 package.json 中的版本号
jq --arg version "$VERSION" '.version = $version' package.json > tmp.json && mv tmp.json package.json

docker build -t orinote-frontend:$VERSION .

docker tag orinote-frontend:$VERSION chalkim/orinote-frontend:$VERSION
# tag if not prerelease
if [ -z "$PRERELEASE" ]; then
  docker tag orinote-frontend:$VERSION chalkim/orinote-frontend:latest
fi

docker push chalkim/orinote-frontend:$VERSION
if [ -z "$PRERELEASE" ]; then
  docker push chalkim/orinote-frontend:latest
fi
