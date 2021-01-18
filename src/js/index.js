document.addEventListener('DOMContentLoaded', function(){
    console.log("index");
    barEnter();
});

function barEnter(){
    const ldbLoginMem = JSON.parse(sessionStorage.getItem("ldbLoginMem"));
    const $btn = $("#signup a, #login a");
    // 로그인 하고 회원가입, 로그인버튼 클릭할 경우
    if(ldbLoginMem!==null){
        $btn.on('click', function(e){
            alert("이미 로그인하셨습니다!");
            e.preventDefault();
        });
    }
}