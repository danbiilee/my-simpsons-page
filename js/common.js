document.addEventListener('DOMContentLoaded', function(){
    console.log("common");
    loginStatusPrint();
    clickLikedMenu();
});

function loginStatusPrint(){
    console.log("loginStatusPrint");

    const ldbLoginMem = JSON.parse(sessionStorage.getItem("ldbLoginMem"));
    const btnLogout = document.querySelector("#btn-logout");

    //로그인을 했다면 로그인, 회원가입 버튼을 지우고,
    //span과 로그아웃 버튼 보이게 하기
    if(ldbLoginMem!==null){
        const liArr = document.querySelectorAll(".not-login");
        const status = document.querySelector("#status");
        const btnLogout = document.querySelector("#btn-logout");

        liArr.forEach(function(item){
            item.style.display = "none";
        });
        btnLogout.style.display = "block";
        status.innerHTML = ldbLoginMem['userName']+"님, 환영합니다!";
    }

    //로그아웃 버튼 누르면 sessinStorage정보 지우기
    btnLogout.addEventListener('click', function(){
        sessionStorage.clear();
        location.reload(); //페이지 새로고침
    });
}

function clickLikedMenu(){
    console.log("clickLikedMenu");

    const likedMenu = document.querySelector("#mm-liked");
    const ldbLoginMem = JSON.parse(sessionStorage.getItem("ldbLoginMem"));
    
    // 로그인 하지 않고 좋아요 페이지 클릭할 경우
    if(ldbLoginMem===null){
        $(likedMenu).on('click', function(e){
            alert("'좋아요'서비스는  로그인 후 이용가능합니다!")
            e.preventDefault();
        });
    }
}

