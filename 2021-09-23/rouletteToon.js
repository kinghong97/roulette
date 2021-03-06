// 이름
function cutAccount(data) {
    return JSON.stringify(data, ['Account'])
}
// 메세지
function cutMessage(data) {
    return JSON.stringify(data, ['Message'])
}
// 제이슨을 어레이안에 어레이로
function toArray(data) {
    return JSON.parse(data).map(doc => Object.values(doc));
}
// 배열안에 유니크찾기
function uniq(data) {
    return Array.from(new Set(data));
}
// 배열안에 개수찾기 data1은 원래배열 data2는 유니크찾은배열
function count(data1, data2) {
    let counts = {}
    for (a of data2){
        let co = data1.filter(element => a === element).length;  
        counts [a] = co
    }
    return counts
}
// 배열 평평하게만들기
function flat(data) {
    return toArray(data).flat(Infinity)
}
//data1 유니크배열 data2이름메세지배열
function sumSum(data1, data2, data3) {
    const arr3 = []
    const arr4 = []
    
// 날짜로 거르기
for(i of data3){
    const ac = data2.filter(function(data){ 
        return data.Time.split(" ")[0] == `${i}`})
        arr3.push(ac)
    }
    for (j of arr3){
        for (i of j) {
        arr4.push(i)
    } }
    // 많이 뽑은 순으로 정렬하려는 나의 노력. ㅠ 결국은 메세지순서만 바꾸면 되는 것.
    const arr = []

        for(i of data1){
            const ac = arr4.filter(function(data){ 
                return data.Account == `${i}`})
            arr.push(ac)
            }

    const arr1 = arr.sort((x,y)=>Object(y).length-Object(x).length)

    const arr2 = []

    for (j of arr1){
        for (i of j) {
        arr2.push(i)
    } }

    const acount1 = cutAccount(arr2)
    const aa1 = uniq(flat(acount1))

    for(i of aa1){
        const acc = arr2.filter(function(data){ 
            return data.Account == `${i}`})

        const acname = acc.map((obj) => Object.values(obj)[2]);
        const acacc = acc.map((obj) => Object.values(obj)[1]);
        const flatmess = flat(cutMessage(acc))
        const uniqmess = uniq(flatmess)
        const countmess = count(flatmess, uniqmess)
    // 메세지 카운트 내림차순
        const sortcount = Object.entries(countmess)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        const allacc = acc.length
        createTable(acname[0], acacc[0], sortcount, allacc)
    }

    
}
    // 입력값이 메세지에 존재할때 
    function textname(data1, data2) {
        const arr = []
            for (i of data2){
                try{
                const as = hihi(data1, i)
                
                arr.push(as)
                } catch {
                    
                }
            }
            const aar1 = arr.filter(
                (element, i) => element !== undefined
                );
            return aar1
        }
    // 입력값이 메세지에 존재할때 
    function hihi (data1,data2) {
        if (Object.entries(data2).flat(Infinity)[9].split(' - ')[0] == `${data1}`)
        return data2
    }

//파일리더기에서 파일읽으면 실행되는 함수 + csv를 json으로 바꾸는 함수
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToJSON(csv_string){
const rows = csv_string.replaceAll("\"", "")
const rowss = rows.replaceAll("\r", "")
const rowsss = rowss.split("\n")
const jsonArray = []; 
const header = rowsss[0].split(","); 
for(let i = 1; i < rowsss.length; i++){ 
let obj = {}; 
let row = rowsss[i].split(","); 
for(let j=0; j < header.length; j++){ obj[header[j]] = row[j]; } 
jsonArray.push(obj); }
return jsonArray; 
}

myForm.addEventListener("submit", function (e) {
e.preventDefault();
const input = csvFile.files[0];
const reader = new FileReader();
//파일로드되면 실행
reader.onload = function (e) {
    const nameText = document.getElementById("nametext").value;
    const date = document.getElementById("daydate").value;
    const text = e.target.result;
    const data = csvToJSON(text);
    const bdata = textname(nameText, data)
    const acount = cutAccount(bdata)
    const aa = uniq(flat(acount))

    sumSum(aa, bdata, dateone(date))

    createTable2(bdata, dateone(date))
    
};

reader.readAsText(input);
});


    // 테이블만들기
    function createTable(data1, data2, data3, data4) {
        const tablerow = tabler(data3)
        table1.innerHTML +=  `<thead><tr><th>${data1}, ${data2}</th><th>Count</th></tr></thead><tbody>${tablerow}<tr><td class="all">All</td><td class="tdValue">${data4}</td></tr></tbody>`
    }
    
    function tabler(data) {
        const tablero = []
        for (const [key, value] of Object.entries(data)){
            tablero.push(`<tr><td class="tdKey">${key.split(' - ')[1]}</td><td class="tdValue">${value}</td></tr>`)
        }
        return String(tablero).replaceAll(",","")
    }
    
    
        //확률테이블
    function createTable2(data1, data2) {
        const arr1 = []
        const arr2 = []
        // 날짜로 거르기
        for(i of data2){
            const ac = data1.filter(function(data){ 
                return data.Time.split(" ")[0] == `${i}`})
                arr1.push(ac)
            }
            for (j of arr1){
                for (i of j) {
                    arr2.push(i)
                } }
                

        const hibye = count(flat(cutMessage(arr2)), uniq(flat(cutMessage(arr2))))
        const hihi = flat(cutMessage(arr2))

        const sum = []
        // 메세지 카운트 내림차순
        const sortcount = Object.entries(hibye)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        
        const tablerow = tabler1(sortcount, hihi)
        for (const [key, value] of Object.entries(sortcount)) {
            const sd = String(value/hihi.length*100)
            const asd = sd.substring(0, 4)
            const s = Number(asd)
            sum.push(s)}
            const ssum = sum.reduce((a,b) => (a+b));
            const ssum1 = String(ssum).substring(0, 4)
        table2.innerHTML += `<thead><tr><th>목록</th><th>개수</th><th>확률</th></tr></thead><tbody>${tablerow}<tr><td class="all">All</td><td class="tdValue">${hihi.length}</td><td class="tdValue">${ssum1} %</td></tr></tbody>`
    }
    
    function tabler1(data,data1) {
        const tablero = []
        for (const [key, value] of Object.entries(data)) {
            const sd = String(value/data1.length*100)
            const asd = sd.substring(0, 4)
            tablero.push(`<tr><td class="tdKey">${key.split(' - ')[1]}</td><td class="tdValue">${value}</td><td class="tdValue">${asd} %</td></tr>`)
        }
        return String(tablero).replaceAll(",","")
    }
    


//테이블을 클립보드에 복사
function selectElementContents(el) {
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
function downImg(){
    html2canvas($("#table1")[0]).then(function(canvas){
    canvas.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
        });
    });
}
//확률 테이블 이미지로 복사하기
function downImg1(){
    html2canvas($("#table2")[0]).then(function(canvas){
    canvas.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
        });
    });
}


// 날짜
function dateone(data) {
    const da = uniq(data.split(" - "))
    if (da.length === 1) {
        
        return Array(da[0].replaceAll("/", "-"))
}   else { 
        const daylist = getDaysArray(new Date(da[0]),new Date(da[1]));
        daylist.map((v)=>v.toISOString().slice(0,10)).join("")
        const datli = []
        for ( i of daylist) {
            const getyear = String(i.getFullYear()).padStart(2, "0");
            const getmonth = String(i.getMonth()+1).padStart(2, "0");
            const getdate = String(i.getDate()).padStart(2, "0");
            datli.push(`${getyear}-${getmonth}-${getdate}`)
        }
        return datli
}}

var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};



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
    "opens": "center",
    "drops": "up"
})

function clicknone() {
    document.getElementById("csv").classList.add("hidden");
    document.getElementById("text1").classList.add("hidden");
    document.getElementById("text2").classList.add("hidden");
    document.getElementById("daydate").classList.add("hidden");
    document.getElementById("nametext").classList.add("hidden");
    document.getElementById("submitbtn").classList.add("hidden");
    document.getElementById("button1").classList.remove("hidden");
    document.getElementById("button2").classList.remove("hidden");
    document.getElementById("button3").classList.remove("hidden");
    document.getElementById("button4").classList.remove("hidden");
}