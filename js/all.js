
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
let year1 = String(today.getFullYear()).padStart(2, "0");
let month = String(today.getMonth() + 1).padStart(2, "0");  // 월
let month1 = String(today.getMonth()).padStart(2, "0");  // 월-1
let date = String(today.getDate()).padStart(2, "0");  // 날짜

if (month1 == `00`){
  month1 = `12`
  year1 = String(today.getFullYear() - 1).padStart(2, "0");
  // month = String(today.getMonth() + 1).padStart(2, "0");
}

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
    "startDate": `${year1}/${month1}/${date}`,
    "endDate": `${year}/${month}/${date}`,
    "opens": "center",
    "drops": "up"
})
//버튼 만들기
function makebtn(data) {
    document.getElementById("btns1").innerHTML = ""
    document.getElementById("btns2").innerHTML = ""
    document.getElementById("btns1").innerHTML += `<button id="button1" class="button" type="button" onclick="copytxt('${data}')">텍스트로 복사</button>`
    document.getElementById("btns1").innerHTML += `<button id="button2" class="button" type="button" onclick="copyimg('#${data}')">이미지로 복사</button>`
    document.getElementById("btns2").innerHTML += `<button id="button3" class="button" type="button" onclick="copytxt('${data}1')">텍스트로 복사</button>`
    document.getElementById("btns2").innerHTML += `<button id="button4" class="button" type="button" onclick="copyimg('#${data}1')">이미지로 복사</button>`
}
//버튼 만들기2
function makebtn2(data) {
  document.getElementById("btns1").innerHTML = ""
  document.getElementById("btns2").innerHTML = ""
  document.getElementById("btns1").innerHTML += `<button id="button1" class="button" type="button" onclick="copytxt('${data}')">텍스트로 복사</button>`
  document.getElementById("btns1").innerHTML += `<button id="button2" class="button" type="button" onclick="copyimg('#${data}')">이미지로 복사</button>`
  document.getElementById("btns2").innerHTML += `<button id="button3" class="button" type="button" onclick="copytxt('${data}5')">텍스트로 복사</button>`
  document.getElementById("btns2").innerHTML += `<button id="button4" class="button" type="button" onclick="copyimg('#${data}5')">이미지로 복사</button>`
}

function makenavbar() {
    document.getElementById("navbardiv").innerHTML = `<nav class="navbar navbar-expand-lg navbar-light fw-bold">
    <div class="container-fluid">
      <a class="navbar-brand navpd" href="https://www.kungtool.com">#kungtool</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                투네이션 룰렛 결산하기
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">테이블 버전</a></li>
            <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toon">전체 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toonselect">선택 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toonfirst">선착순 결산하기</a></li>
              <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="#">텍스트 버전</a></li>
              <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toontxt">전체 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toonselecttxt">선택 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/toonfirsttxt">선착순 결산하기</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                트윕 룰렛 결산하기
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">테이블 버전</a></li>
            <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="https://www.kungtool.com/twip">전체 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/twipfirst">선착순 결산하기</a></li>
              <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="#">텍스트 버전</a></li>
              <div class="dropdown-divider"></div>
              <li><a class="dropdown-item" href="https://www.kungtool.com/twiptxt">전체 결산하기</a></li>
              <li><a class="dropdown-item" href="https://www.kungtool.com/twipfirsttxt">선착순 결산하기</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/kinghong97">개발자</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.kungtool.com/blog">블로그</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`
}
makenavbar()

//테이블을 클립보드에 복사
function copytxt(ell) {
  var el = document.getElementById(ell)
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
          range.selectNodeContents(el);
          sel.addRange(range);
      } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
      }
  } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
  }
  document.execCommand("Copy");}

//테이블 이미지로 복사하기
function copyimg(data){
  html2canvas($(data)[0]).then(function(canvas){
  canvas.toBlob(function(blob) { 
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]); 
      });
  });
}

const table1 = document.getElementById("table1")
const table2 = document.getElementById("table11")
const retext1 = document.getElementById("text5")
const retext2 = document.getElementById("text55")

function nameclick() {
  retext1.innerHTML = ""
  retext2.innerHTML = ""
  pickmsg1()
}
function msgclick() {
  retext1.innerHTML = ""
  retext2.innerHTML = ""
  pickmsg2()
}