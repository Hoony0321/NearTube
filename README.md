<p align="center">
  <img src="https://github.com/Hoony0321/NearTube/assets/50730897/9e01f8b3-6a19-4835-ad30-70214da0b8a7" style="width:70%">
</p>

<br>

## 💡프로젝트 소개

### Neartube는 이웃이 주로 보는 유튜브 영상을 추천해주는 서비스입니다.
 많은 사람들이 잣신 주변 사람들의 관심사를 궁금하고 공통 관심사를 형성하고자 합니다.  
이에 NearTube를 통해 주변 사람들의 영상을 수집하고 이웃의 관심 영상을 제공하고자 합니다.  
이 프로젝트를 통해 친구 / 회사 사람들 / 동네 이웃들이 많이 보는 영상/ 관심사를 제공해준다면, 사용자는 새로운 영상에도 흥미를 느끼고 이웃과 공통 관심사 형성도 가능합니다.  

이 서비스는 개인정보보호에 대한 중요성을 인식하여, 회원들의 개인정보를 철저히 보호하며, 분석된 결과는 회원 개인에게만 제공될 예정입니다.

카테고리 추천 예시 : 경희대 학생 / 경희대 교수 / 강남 개발자 직군 / 강남 20대 여성 / OO초등학교 10대 

[당신이 본 유튜브 70%는 알고리즘이 추천… 자신도 모르게 중독](https://www.chosun.com/economy/tech_it/2021/01/01/IYRYZY6L45GVFB6IUKDDGDRLHY/)

[못믿을 유튜브 추천 알고리즘…'싫어요' 눌렀는데 계속 추천](https://www.upinews.kr/newsView/upi202209270052)

[유튜브화면에 뜨는 영상들이 거의 다 똑같은 영상들만 떠요 시청기록삭제를해도 똑같아요 - YouTube 커뮤니티](https://support.google.com/youtube/thread/163131491?hl=ko)


<br>
<br>

## 기술 스택

| Chrome Extension | React |  Spring   |  Mysql  | AWS |
| :--------: | :--------: | :------: | :-----: | :-----: | 
|    <img src="https://img.shields.io/badge/chrome extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white">    |    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">      | <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">  | <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">  | <img src="https://img.shields.io/badge/Amazon AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"> |


<br>
<br>

## 🕹️ 개발 내용

### 🌐 Chrome Extension

- **user google login**
    - 사용자의 개인정보(이메일/이름/성별)을 받아오기
    - 사용자의 youtube 구독 리스트 받아오기
    - ~~user youtube activity 정보 받아오기(좋아요,싫어요,댓글)(미정)~~
- **get top vidoes**
    - 사용자가 “youtube”에 접속했을 때, 상단에 노출되는 유튜브 영상들 수집
- **show recommended cluster(recommend) - 핵심 기능**
    - 사용자가 youtube에 접속했을 때, 상단 부분에 클러스터링된 유사한 그룹 정보 제공
    - 사용자가 속한 그룹의 최다빈출 동영상, 채널, 카테고리 제공
 
 <br>

### 🎮 Backend (Spring - MySQL)

- **Member System**
    - 기본적인 회원 CRUD 기능
- **Video / Channel / Location System**
    - 기본적으로 크롬 익스텐션으로 수집하는 정보
    - 유저의 구독 채널, 위치, 비디오 영상 정보 수집
- **Clustering System - 핵심**
    - K-Means Clustering (Java Weka 이용)
        - 사용자의 위치 정보를 토대로 Clustering 진행
        - **(문제 발생) 초기 선택 centroid에 따라 성능이 달라짐 → 여러 centroid를 발생시켜 반복해서 학습 → 가장 좋은 성능을 보이는 centroid 선택**
- **Recommend System**
    - 해당 유저와 가상 유사한 그룹 정보를 제공
    - 그룹 추천은 여러 기준이 적용될 예정 (장소, 학과, 영상 etc…)
- **Clustering Page**
    - 클러스터링 결과를 확인할 수 있는 페이지 제공
    
<br>
<br>

### 서비스 화면

**로그인 화면**
<p align="center">
  <img width="329" alt="스크린샷 2023-06-22 오후 3 43 23" src="https://github.com/Hoony0321/NearTube/assets/50730897/dfea65cf-935d-40e4-b881-9b52edda895e">
  <img width="326" alt="스크린샷 2023-06-22 오후 3 41 43" src="https://github.com/Hoony0321/NearTube/assets/50730897/6d552a1a-26e6-45a0-be33-92775610c625">
</p>

<br>

**메인 서비스 화면**
<p align="center">
  <img width="1211" alt="스크린샷 2023-06-22 오후 5 21 51" src="https://github.com/Hoony0321/NearTube/assets/50730897/39b4dfb5-156a-4dc4-8cf6-ac522bf7f5a3">
</p>

<br>
<br>

### 데모 영상
https://www.youtube.com/watch?v=PxVrMwz6VHU

