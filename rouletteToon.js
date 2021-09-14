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
function sumSum(data1, data2) {
    for(i of data1){
        const acc = data2.filter(function(data){ 
            return data.Account == `${i}`})
        const acname = acc.map((obj) => Object.values(obj)[2]);
        const acacc = acc.map((obj) => Object.values(obj)[1]);
        const flatmess = flat(cutMessage(acc))
        const uniqmess = uniq(flatmess)
        const countmess = count(flatmess, uniqmess)
        const allacc = acc.length
        createTable(acname[0], acacc[0], countmess, allacc)
        }
    
    }
    // 입력값이 메세지에 존재할때 
    function textname(data1, data2) {
        const arr = []
        for (i of data2){
            const as = hihi(data1, i)
            arr.push(as)
        }
    const aar1 = arr.filter(
        (element, i) => element !== undefined
      );
    return aar1
    }
    // 입력값이 메세지에 존재할때 
    function hihi (data1,data2) {
        if (Object.entries(data2).flat(Infinity)[9].replace("\"", "").split(' ')[0] == `${data1}`)
        return data2
    }

// 테이블만들기
function createTable(data1, data2, data3, data4) {

    document.write('<thead>')
    document.write('<tr>')
    document.write('<th>')
    document.write(`${data1}, ${data2}`)
    document.write('</th>')
    document.write('<th>')
    document.write(`Count`)
    document.write('</th>')
    document.write('</tr>')
    document.write('</thead>')
    document.write('<tbody>')
    for (const [key, value] of Object.entries(data3)) {
        document.write('<tr>')
        document.write('<td>')
        document.write(`${key.replace("\"", "")}`)
        document.write('</td>')
        document.write('<td>')
        document.write(`${value}`)
        document.write('</td>')
        document.write('</tr>')
    }
    document.write('<tr>')
    document.write('<td class="all">')
    document.write(`All`)
    document.write('</td>')
    document.write('<td>')
    document.write(`${data4}`)
    document.write('</td>')
    document.write('</tr>')
    document.write('</tbody>')
}
//파일리더기에서 파일읽으면 실행되는 함수 + csv를 json으로 바꾸는 함수
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToJSON(csv_string){
const rows = csv_string.split("\r\n"); 
const jsonArray = []; 
const header = rows[0].split(","); 
for(let i = 1; i < rows.length; i++){ 
let obj = {}; 
let row = rows[i].split(","); 
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
    const text = e.target.result;
    const data = csvToJSON(text);
    const bdata = textname(nameText, data)
    const acount = cutAccount(bdata)
    const aa = uniq(flat(acount))
    console.log(bdata)

    document.write(`<div class="wrapper2">`)
    document.write(`<input class="button" type="button" value="텍스트로 복사" onclick="selectElementContents( document.getElementById('atta') );">`);
    document.write(`<button class="button" type="button" onclick="downImg()">이미지로 복사</button>`);
    document.write(`</div>`)
    document.write('<table id="atta"class="csvtable">')
    sumSum(aa, bdata)
    document.write('</table>')
    document.write(`<div class="wrapper2">`)
    document.write(`<input class="button" type="button" value="텍스트로 복사" onclick="selectElementContents( document.getElementById('attaat') );">`);
    document.write(`<button class="button" type="button" onclick="downImg1()">이미지로 복사</button>`);
    document.write(`</div>`)
    mm(bdata)
    document.write('<br> <br> <br>')
    
    document.write(`<link rel="stylesheet" href="style.css">`);
    document.write(`<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>`);
    document.write(`<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>`);
};

reader.readAsText(input);
});

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
    html2canvas($("#atta")[0]).then(function(canvas){
    canvas.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
        });
    });
}
//확률 테이블 이미지로 복사하기
function downImg1(){
    html2canvas($("#attaat")[0]).then(function(canvas){
    canvas.toBlob(function(blob) { 
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]); 
        });
    });
}

// 확률 계산하기
function mm(data) {
    const flatmess = flat(cutMessage(data))
    const uniqmess = uniq(flatmess)
    const countmess = count(flatmess, uniqmess)
    const sum = []
    document.write('<table id="attaat" class="csvtable">')
    document.write('<thead>')
    document.write('<tr>')
    document.write('<th>')
    document.write(`룰렛 목록`)
    document.write('</th>')
    document.write('<th>')
    document.write(`개수`)
    document.write('</th>')
    document.write('<th>')
    document.write(`확률`)
    document.write('</th>')
    document.write('</tr>')
    document.write('</thead>')
    document.write('<tbody>')
    for (const [key, value] of Object.entries(countmess)) {
        const sd = String(value/flatmess.length*100)
        const asd = sd.substring(0, 4)
        const s = Number(asd)
        document.write('<tr>')
        document.write('<td>')
        document.write(`${key.replace("\"", "")}`)
        document.write('</td>')
        document.write('<td>')
        document.write(`${value}`)
        document.write('</td>')
        document.write('<td>')
        document.write(`${asd} %`)
        document.write('</td>')
        document.write('</tr>')
        sum.push(s)
    }
    document.write('<tr>')
    document.write('<td class="all">')
    document.write(`All`)
    document.write('</td>')
    document.write('<td>')
    document.write(`${flatmess.length}`)
    document.write('</td>')
    document.write('<td>')
    const ssum = sum.reduce((a,b) => (a+b));
    const ssum1 = String(ssum).substring(0, 4)
    document.write(`${ssum1} %`)
    document.write('</td>')
    document.write('</tr>')
    document.write('</tbody>')
    document.write('</table>')
}