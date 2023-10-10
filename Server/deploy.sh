#!/bin/bash

# 1. Git에서 최신 코드를 가져옵니다.
echo "Step 1: Git Pull"
git pull origin main

# 2. Gradle을 사용하여 프로젝트를 빌드합니다.
echo "Step 2: Gradle Build"
./gradlew build

# 3. 기존 프로세스를 종료합니다.
echo "Step 3: Stopping Existing Process"
pkill -f "java -jar NearTube-0.0.1-SNAPSHOT.jar"

# 4. 새로운 프로세스를 시작합니다.
echo "Step 4: Starting New Process"
nohup java -jar build/libs/NearTube-0.0.1-SNAPSHOT.jar > app.log 2>&1 &

# 배포 완료 메시지 출력
echo "Deployment completed."

