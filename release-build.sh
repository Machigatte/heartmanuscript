#!/bin/bash

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

# 更新 gradle.properties 中的版本号
sed -i "s/^version=.*/version=$VERSION/" gradle.properties

# 执行 Gradle 构建
if [ -n "$PRERELEASE" ]; then
  ./gradlew clean build -Pprerelease
else
  ./gradlew clean build
fi

# 检查构建是否成功
if [ $? -ne 0 ]; then
  echo "Error: 构建失败"
  exit 1
fi

echo "构建成功"