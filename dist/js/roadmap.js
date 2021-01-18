document.addEventListener('DOMContentLoaded', function(){
    console.log("roadmap");
    
    const btnBE = document.querySelector("#back .btn-num");
    const btnDB = document.querySelector("#db .btn-num");
    const btnFE = document.querySelector("#front .btn-num");
    const btnDev = document.querySelector("#devops .btn-num");
    const btnEtc = document.querySelector("#etc .btn-num");

    const pBE = document.querySelectorAll("#back p");
    const pDB = document.querySelectorAll("#db p");
    const pFE = document.querySelectorAll("#front p");
    const pDev = document.querySelectorAll("#devops p");
    const pEtc = document.querySelectorAll("#etc p");

    showText(btnBE, pBE);
    showText(btnDB, pDB);
    showText(btnFE, pFE);
    showText(btnDev, pDev);
    showText(btnEtc, pEtc);
    
});

function showText(btn, text){
    btn.addEventListener('click', function(){
        $(this).css("background", "#01b7af").css("color", "black");
        $(text).each(function(){
            $(this).css("transform", "translate(0,0)")
                   .css("opacity", "1");
        }); 
    });
}