document.addEventListener('DOMContentLoaded', function () {
  console.log('video');

  //bxSlider
  $('#bx-pager').bxSlider({
    slideWidth: '275',
    minSlides: 3,
    maxSlides: 3,
    moveSlides: 1,
    slideMargin: 0,
    pager: false,
    infiniteLoop: false,
    touchEnabled: false,
  });

  //동영상정보 객체들
  const s31e5IdArr = [
    {
      videoId: 'gFbpo8pukdI',
      title: 'The Simpsons Ultimate Christmas Compilation',
    },
    { videoId: 'B1IXA5TXNME', title: 'Top 5 Best Simpsons Christmas Episodes' },
    {
      videoId: 'lNdTXDX_FsY',
      title: 'Simpsons Christmas: The Tracey Ullman Show',
    },
    {
      videoId: 'sR5nP-UVX7U',
      title: 'Every Treehouse Of Horror Opening and Couch Gags',
    },
    {
      videoId: 'EabNXfblSQU',
      title: 'Every Treehouse Of Horror Segment In 30 Seconds',
    },
    {
      videoId: 'ZBJrMvKw9oU',
      title: 'The Ultimate Treehouse Of Horror Compilation',
    },
  ];
  const s31e6IdArr = [
    {
      videoId: 'sR5nP-UVX7U',
      title: 'Every Treehouse Of Horror Opening and Couch Gags',
    },
    {
      videoId: 'EabNXfblSQU',
      title: 'Every Treehouse Of Horror Segment In 30 Seconds',
    },
    {
      videoId: 'ZBJrMvKw9oU',
      title: 'The Ultimate Treehouse Of Horror Compilation',
    },
    {
      videoId: 'HUVudMVKCxI',
      title: 'Top 10 Best Treehouse Of Horror Segments',
    },
    {
      videoId: '1_030w4WbAo',
      title: 'Best Treehouse Of Horror Deaths Of All Time',
    },
    {
      videoId: '2ukozdxgg8Q',
      title: 'How To Cook Humans',
    },
  ];
  const s31e7IdArr = [
    { videoId: 'QWsobCRSWnQ', title: 'Best Of Classic Simpsons' },
    { videoId: 'JvaxU0oBXqM', title: 'Best Of Classic Simpsons Part 2' },
    { videoId: 'mq9GNp7vcxo', title: 'Best Of Classic Simpsons Part 3' },
    { videoId: 'gLyflCO7D44', title: 'Best Of Classic Simpsons Part 4' },
    {
      videoId: 'uJY32chE50U',
      title: 'The Best Rated Simpson Episodes Of All Time',
    },
    { videoId: 'ItNjORDKUGk', title: 'Best Rated Modern Simpson Episodes' },
    {
      videoId: 'i6VDP104O2g',
      title: 'Worst Rated Simpsons Episodes Of All Time',
    },
  ];
  const s31e5 = {
    idArr: s31e5IdArr,
    thumbArr: document.querySelectorAll('#s31e5 .thumb'),
    btnArr: document.querySelectorAll('#s31e5 .btn-hover'),
    imgLoad: function (i, key) {
      this.thumbArr[i].src += key + '/0.jpg';
    },
    titleLoad: function (i) {
      this.btnArr[i].innerHTML = this.idArr[i]['title'];
    },
  };
  const s31e6 = {
    idArr: s31e6IdArr,
    thumbArr: document.querySelectorAll('#s31e6 .thumb'),
    btnArr: document.querySelectorAll('#s31e6 .btn-hover'),
    imgLoad: function (i, key) {
      this.thumbArr[i].src += key + '/0.jpg';
    },
    titleLoad: function (i) {
      this.btnArr[i].innerHTML = this.idArr[i]['title'];
    },
  };
  const s31e7 = {
    idArr: s31e7IdArr,
    thumbArr: document.querySelectorAll('#s31e7 .thumb'),
    btnArr: document.querySelectorAll('#s31e7 .btn-hover'),
    imgLoad: function (i, key) {
      this.thumbArr[i].src += key + '/0.jpg';
    },
    titleLoad: function (i) {
      this.btnArr[i].innerHTML = this.idArr[i]['title'];
    },
  };

  // 슬라이더(썸네일) 클릭하면 해당 동영상 div#video-selected에 로드시키기
  loadedVideo(s31e5);
  loadedVideo(s31e6);
  loadedVideo(s31e7);

  //select-option 클릭하면 해당 play-list띄우기
  selectVideo(s31e5IdArr, s31e6IdArr, s31e7IdArr);

  //좋아요버튼 누르면 로그인 정보에 저장하기
  addLike(s31e5IdArr, s31e6IdArr, s31e7IdArr);
});

function loadedVideo(obj) {
  const loaded = document.querySelector('#video-loaded');
  const btnLike = document.querySelector('#btn-like');

  for (let i = 0; i < obj['idArr'].length; i++) {
    const key = obj['idArr'][i]['videoId'];
    obj['imgLoad'](i, key); //썸네일 이미지 로드
    obj['titleLoad'](i); //button.btn-hover에 타이틀 추가

    //동영상 로드
    obj['btnArr'][i].onclick = function () {
      loaded.innerHTML =
        "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" +
        key +
        "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";

      //하트 컬러: 현재 회원의 liked정보와 비교해서 있으면 주황색, 없으면 투명
      const ldbLoginMem = JSON.parse(sessionStorage.getItem('ldbLoginMem'));
      let bool = false; //현재 회원의 liked정보에 로딩된 영상이 있는지 여부
      ldbLoginMem['liked'].forEach(function (item) {
        if (item['videoId'] === key) {
          bool = true;
          console.log(item['videoId'], key);
        }
      });

      if (bool) {
        btnLike.style.backgroundColor = '#ff7c49'; //좋아요 잘 체크됐다!
      } else {
        btnLike.style.backgroundColor = '#fdfef1'; //좋아요 잘 해제됐다!
      }
    };
  }
}

function selectVideo(s31e5IdArr, s31e6IdArr, s31e7IdArr) {
  const loaded = document.querySelector('#video-loaded');
  const select = document.querySelector('#select-epi');
  const playlist = document.querySelector('#play-list').children;
  select.addEventListener('change', function () {
    //loaded에 대표 영상 띄우기
    if (this.value === 's31e5')
      loaded.innerHTML =
        "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" +
        s31e5IdArr[0]['videoId'] +
        "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    if (this.value === 's31e6')
      loaded.innerHTML =
        "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" +
        s31e6IdArr[0]['videoId'] +
        "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    if (this.value === 's31e7')
      loaded.innerHTML =
        "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" +
        s31e7IdArr[0]['videoId'] +
        "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";

    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === this.value) {
        playlist[i].style.display = 'block';
        if (i !== 0) {
          const bxPager = playlist[i].firstChild.nextSibling;
          $(bxPager).bxSlider({
            slideWidth: '275',
            minSlides: 3,
            maxSlides: 3,
            moveSlides: 1,
            slideMargin: 0,
            pager: false,
            infiniteLoop: false,
            touchEnabled: false,
          });
        }
      } else {
        playlist[i].style.display = 'none';
      }
    }
  });
}

function addLike(s31e5IdArr, s31e6IdArr, s31e7IdArr) {
  //좋아요 정보를 담는 생성자 함수
  function Liked(videoId, title, date) {
    this.videoId = videoId;
    this.title = title;
    this.date = date;
  }

  //좋아요버튼 누르면 로그인 정보에 저장하기
  const btnLike = document.querySelector('#btn-like');
  const select = document.querySelector('#select-epi');
  let i = 0; //IdArr에서 현재 동영상 id값과 일치하는 인덱스

  btnLike.addEventListener('click', function () {
    const videoId = this.parentNode.nextSibling.nextSibling.firstChild.src.split(
      '/',
    )[4]; //좋아요를 누른 비디오의 id값 추출
    let likedInfo = undefined;

    //index값 구하기, 좋아요 객체 만들기
    if (select.value === 's31e5') {
      i = getIndex(videoId, s31e5IdArr);
      likedInfo = new Liked(
        videoId,
        s31e5IdArr[i]['title'],
        new Date().getTime(),
      );
    } else if (select.value === 's31e6') {
      i = getIndex(videoId, s31e6IdArr);
      likedInfo = new Liked(
        videoId,
        s31e6IdArr[i]['title'],
        new Date().getTime(),
      );
    } else if (select.value === 's31e7') {
      i = getIndex(videoId, s31e7IdArr);
      likedInfo = new Liked(
        videoId,
        s31e7IdArr[i]['title'],
        new Date().getTime(),
      );
    }

    //localStorage의 회원정보에 저장하기
    const ldbLoginMem = JSON.parse(sessionStorage.getItem('ldbLoginMem'));
    //1.로그인을 하지 않았다면
    if (ldbLoginMem === null) {
      alert('로그인을 해주세요!');
    }

    //2.처음 좋아요를 누르는 경우
    if (ldbLoginMem['liked'] === undefined) {
      ldbLoginMem['liked'] = [];
    }

    //모든 회원정보가 담긴 ldbMembers에서 현재 로그인정보와 일치하는 회원의 liked정보와 비교
    const email = ldbLoginMem['email']; //현재 로그인 중인 회원 이메일
    const ldbMembers = JSON.parse(localStorage.getItem('ldbMembers'));
    let memIndex = 0; //현재 로그인 중인 회원과 일치하는 ldbMembers의 인덱스
    let likedArr = ''; //현재 회원의 local-liked데이터
    let cnt = 0; //local-liked데이터에서 videoId값이 존재하는지 여부(좋아요 눌렀는지)
    let likedIndex = 0; //liked데이터와 일치하는 likedArr의 인덱스(삭제될 liked의 번지)

    for (let i in ldbMembers) {
      if (ldbMembers[i]['email'] === email) {
        memIndex = i;
        likedArr = ldbMembers[i]['liked'];
      }
    }
    for (let i in likedArr) {
      if (likedArr[i]['videoId'] === videoId) {
        cnt++;
        likedIndex = i;
      }
    }

    //3.좋아요를 누르지 않았다면 정보 저장
    if (cnt === 0) {
      ldbLoginMem['liked'].push(likedInfo);

      //회원정보에도 저장
      storeMember(ldbLoginMem, ldbMembers, memIndex);

      this.style.backgroundColor = 'orange'; //좋아요 잘 체크됐다!
    }
    //4.눌렀었다면 정보 삭제
    else {
      ldbLoginMem['liked'].splice(likedIndex, 1);

      //회원정보에도 저장
      storeMember(ldbLoginMem, ldbMembers, memIndex);

      btnLike.style.background =
        "white url('images/ico_like.png') no-repeat center"; //좋아요 잘 해제됐다!
    }
  });

  function getIndex(videoId, arr) {
    let i = 0;
    arr.forEach(function (item, index) {
      if (videoId === item['videoId']) i = index;
    });
    return i;
  }

  function storeMember(ldbLoginMem, ldbMembers, memIndex) {
    //sessinStorage에 저장
    const sessionStr = JSON.stringify(ldbLoginMem);
    sessionStorage.setItem('ldbLoginMem', sessionStr);

    //ldbMembers에서 로그인중인 회원과 일치하는 회원정보를 지우고 liked정보 담긴 ldbLoginMem으로 대체
    ldbMembers.splice(memIndex, 1, ldbLoginMem);

    //변경된 ldbMembers를 localStorage에 저장
    const localStr = JSON.stringify(ldbMembers);
    localStorage.setItem('ldbMembers', localStr);
  }
}
