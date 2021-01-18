document.addEventListener('DOMContentLoaded', function () {
  console.log('liked');
  addLikedVideoes();

  //로그아웃 버튼 누르면 메인페이지로 이동
  const btnLogout = document.querySelector('#btn-logout');
  btnLogout.addEventListener('click', function () {
    alert('로그아웃 되어 메인페이지로 이동합니다!');
    location.href = 'index.html';
  });
});

function addLikedVideoes() {
  const ldbLoginMem = JSON.parse(sessionStorage.getItem('ldbLoginMem')); //현재 로그인 중인 회원
  const email = ldbLoginMem['email'];
  const ldbMembers = JSON.parse(localStorage.getItem('ldbMembers')); //모든 회원정보가 담긴 ldbMembers
  let memIndex = 0; //현재 로그인 중인 회원과 일치하는 ldbMembers의 인덱스
  let likedArr = ''; //현재 회원의 local-liked데이터

  for (let i in ldbMembers) {
    if (ldbMembers[i]['email'] === email) {
      memIndex = i;
      likedArr = ldbMembers[i]['liked'];
    }
  }

  //타이틀 - Liked ''개 수정
  const ea = document.querySelector('#ea');
  // const strEa = likedArr.length;
  ea.innerHTML = likedArr && likedArr.length ? likedArr.length : 0;

  //동적으로 li추가 - 3개(default)
  let start = 0;
  let end = 2;
  if (likedArr.length < 3) end = likedArr.length - 1; //좋아요한 영상이 3개보다 적을 경우
  addLiTag(start, end, likedArr);

  //좋아요한 영상이 4개 이상일 경우
  //see all 버튼을 눌렀을 때 다시 3개가 보이도록
  // let cnt = parseInt(likedArr.length/3); //총 추가 횟수
  let cnt = likedArr.length / 3; //총 추가 횟수
  if (likedArr.length % 3 === 0) cnt -= 1;
  console.log(likedArr.length);
  console.log(cnt);
  const btnSeeAll = document.querySelector('#btn-seeAll');
  const liked = document.querySelector('#liked');
  let h = 300; //div#liked 높이값
  btnSeeAll.addEventListener('click', function () {
    if (cnt >= 1) {
      cnt--;
      start += 3;
      end += 3;
      h += 300;

      liked.style.height = h + 'px';
      addLiTag(start, end, likedArr);
    } else {
      alert('마지막입니다!');
    }
  });
}

function addLiTag(start, end, likedArr) {
  for (let i = start; i <= end; i++) {
    const videoId = likedArr[i]['videoId'];
    const d = new this.Date(likedArr[i]['date']);
    const date =
      d.getFullYear() +
      '/' +
      (d.getMonth() + 1) +
      '/' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes();
    const title = likedArr[i]['title'];

    addNode(videoId, title, date);
  }
}

function addNode(videoId, title, date) {
  const ul = document.querySelector('#liked-list');
  const li = document.createElement('li');

  const imgNode = document.createElement('img');
  imgNode['src'] = 'https://i.ytimg.com/vi/' + videoId + '/0.jpg';

  const pTitle = document.createElement('p');
  const pDate = document.createElement('p');
  pTitle['className'] = 'title';
  pDate['className'] = 'date';
  const titleNode = document.createTextNode(title);
  const dateNode = this.document.createTextNode(date);
  pTitle.appendChild(titleNode);
  pDate.appendChild(dateNode);

  li.appendChild(imgNode);
  li.appendChild(pTitle);
  li.appendChild(pDate);

  ul.appendChild(li);
}
