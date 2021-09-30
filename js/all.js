
// 스크롤 위로 올리는 함수
var timeOut;
function scrollToTop() {
    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
        window.scrollBy(0,-10000);
        timeOut=setTimeout('scrollToTop()',700);
    }
    else clearTimeout(timeOut);
}


$(document).ready(function(){

    var navHeight = $(".navbar").height(); 


    $(window).scroll(function(){  // 윈도우 스크롤 기능 작동
        var rollIt = $(this).scrollTop() >= navHeight; 
// 스크롤의 정도가 navHeight 의 값을 넘었을 때 == 윈도우 스크롤의 값이 navHeight 의 높이와 같거나 크다

/*
scrollTop 은 윈도우에서 스크롤의 위치가 가장 상위에 있다는 의미로 해석
스크롤의 위치가 화면 아래일수록 == scrollTop 의 값이 커짐
*/

    if(rollIt){ 
		//윈도우 스크롤 기능의 값이 navHeight 의 높이와 같거나 크면
            $("#toppointer").css({"opacity":"1"});
        }
        else{
            $("#toppointer").css({"opacity":"0"});
        }
    });
    
});


// 현재 년월일 구하기

let today = new Date();   

let year = String(today.getFullYear()).padStart(2, "0"); // 년도
let month = String(today.getMonth() +1).padStart(2, "0");  // 월
let month1 = String(today.getMonth()).padStart(2, "0");  // 월-1
let date = String(today.getDate()).padStart(2, "0");  // 날짜



// 캘린더 함수 
$('#daydate').daterangepicker({
    "locale": {
        "format": "YYYY/MM/DD",
        "separator": " - ",
        "applyLabel": "확인",
        "cancelLabel": "취소",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "일",
            "월",
            "화",
            "수",
            "목",
            "금",
            "토"
        ],
        "monthNames": [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월"
        ],
        "firstDay": 1
    },
    "startDate": `${year}/${month1}/${date}`,
    "endDate": `${year}/${month}/${date}`,
    "opens": "center",
    "drops": "up"
})

