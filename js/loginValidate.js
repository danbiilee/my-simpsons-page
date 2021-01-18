console.log('login');

function loginValidate() {
  const email = document.querySelector('#email');
  const pwd = document.querySelector('#pwd');
  const ldbMembers = JSON.parse(localStorage.getItem('ldbMembers'));
  let cnt = 0; //아이디 존재여부
  let bool = true; //비밀번호 일치여부
  let i = 0; //일치하는 회원의 ldbMembers 인덱스

  if (ldbMembers) {
    ldbMembers.forEach(function (item, index) {
      if (item['email'] == email.value) {
        cnt++;
        i = index;
        //비밀번호가 틀린경우
        if (item['pwd'] != pwd.value) {
          bool = false;
        }
      }
    });
  }

  //아이디가 없는 경우
  if (cnt === 0) {
    email.value = '';
    pwd.value = '';
    email.focus();
    alert('존재하지 않는 아이디입니다.');
    return false;
  }

  //비밀번호 다를 경우
  if (!bool) {
    pwd.value = '';
    pwd.focus();
    alert('유효한 비밀번호가 아닙니다.');
    return false;
  }

  //둘 다 맞은 경우
  if (cnt === 1 && bool === true) {
    //로그인 정보 저장
    const ldbLoginMem = ldbMembers[i];
    const jsonStr = JSON.stringify(ldbLoginMem);
    sessionStorage.setItem('ldbLoginMem', jsonStr);

    history.back();
    return true;
  }
}
