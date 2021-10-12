// 이름
function cutAccount(data) {
    return JSON.stringify(data, ['트위치ID'])
}
// 닉네임
function cutName(data) {
    return JSON.stringify(data, ['후원닉네임'])
}
// 메세지
function cutMessage(data) {
    return JSON.stringify(data, ['후원메시지'])
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
// 메세지 유니크
function uniqmsg(data) {
    return uniq(flat(cutMessage(data)))
}
// 체크박스만들기
function makecheck(data) {
    for (i of data) {
        document.getElementById("checktext1").innerHTML +=  `<input id="checkboxbox" name="check" type="checkbox" value="${i}">${i} <br />`;
    }
}

// 날짜와 가격으로 거르기 data1 가격 data2 전체배열 data3 날짜
function dateprice(data1, data2, data3) {
    const arr1 = []
    const arr2 = []

    for(i of data3){
        const ac = data2.filter(function(data){ 
            return data.후원일자.split(" ")[0] == `${i}`})
        const ac1 = ac.filter(function(data){ 
            return data.후원캐시 == `${data1}`})
            arr1.push(ac1)
        }
        for (j of arr1){
            for (i of j) {
            arr2.push(i)
        } }
        return arr2
}





//data1 유니크배열 data2 전체배열
function sumSum1(data1, data2) {
    const cutac = uniq(flat(cutAccount(data2)))
    const arr10 = []
    const arr20 = []
    
    for ( i of data1){
        const ac = data2.filter(function(data){ 
            return data.후원메시지 == `${i}`})
            arr10.push(ac)
        }
    for (j of arr10){
        for (i of j) {
            arr20.push(i)
        } }


        
        // 많이 뽑은 순으로 정렬하려는 나의 노력. ㅠ 결국은 메세지순서만 바꾸면 되는 것.
    const arr = []
    for(i of cutac){
        const ac = arr20.filter(function(data){ 
            return data.트위치ID == `${i}`})
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
            return data.트위치ID == `${i}`})

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
        
        createTable(acname[0], acacc[0], sortcount, allacc, arr20)
        
    }
    createTable2(arr20, data1)

    
}

//data1 유니크배열 data2 전체배열
function sumSum(data1, data2) {
    const cutac = uniq(flat(cutAccount(data2)))
    const arr10 = []
    const arr20 = []
    
    for ( i of data1){
        const ac = data2.filter(function(data){ 
            return data.후원메시지 == `${i}`})
            arr10.push(ac)
        }
    for (j of arr10){
        for (i of j) {
            arr20.push(i)
        } }
    const flatmess1 = flat(cutMessage(arr20))
    const uniqmess1 = uniq(flatmess1)   
        
        // 많이 뽑은 순으로 정렬하려는 나의 노력. ㅠ 결국은 메세지순서만 바꾸면 되는 것.
    const arr = []
    for(i of uniqmess1){
        const ac = arr20.filter(function(data){ 
            return data.후원메시지 == `${i}`})
            arr.push(ac)
        }
            
    const arr1 = arr.sort((x,y)=>Object(x).length-Object(y).length)
    
    const arr2 = []
    
    for (j of arr1){
        for (i of j) {
            arr2.push(i)
        } }
                
    const flatmess = flat(cutMessage(arr2))
    const uniqmess = uniq(flatmess)
    
    for(i of uniqmess){
        const msg = arr2.filter(function(data){ 
            return data.후원메시지 == `${i}`})

        const acname = msg.map((obj) => Object.values(obj)[2]);
        const acacc = msg.map((obj) => Object.values(obj)[1]);
        const flataccc =  flat(cutName(msg))
        const uniqacc = uniq(flataccc)
        const countacc = count(flataccc, uniqacc)

    // 메세지 카운트 내림차순
        const sortcount = Object.entries(countacc)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        const allacc = msg.length
        
        createTable3(acname[0], i, sortcount, allacc, arr20)
        
    }
    createTable2(arr20, data1)

    
}


    // 테이블만들기
function createTable(data1, data2, data3, data4) {
    const tablerow = tabler(data3)
    retext1.innerHTML +=  `${data2}<br>${tablerow}<br>`
}

function tabler(data) {
    const tablero = []
    for (const [key, value] of Object.entries(data)){
        tablero.push(`- ${key} ${value}<br>`)
    }
    return String(tablero).replaceAll(",","")
}
    // 테이블만들기
    function createTable3(data1, data2, data3, data4) {
        const tablerow = tabler(data3)
        retext1.innerHTML +=  `${data2}<br>${tablerow}<br>`
    }
    
    function tabler3(data) {
        const tablero = []
        for (const [key, value] of Object.entries(data)){
            tablero.push(`- ${key} ${value}<br>`)
        }
        return String(tablero).replaceAll(",","")
    }


    //확률테이블
function createTable2(data, data1) {
    const sum = []
    const hibye = count(flat(cutMessage(data)), data1)
    const hihi = flat(cutMessage(data))
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
        retext2.innerHTML += `목록<br>${tablerow}<br>`
}

function tabler1(data,data1) {
    const tablero = []
    for (const [key, value] of Object.entries(data)) {
        const sd = String(value/data1.length*100)
        const asd = sd.substring(0, 4)
        tablero.push(`- ${key} ${value}<br>`)
    }
    return String(tablero).replaceAll(",","")
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



const roulettes = []

function priceCheck(e) {
  e.preventDefault();
const input = csvFile.files[0];
const reader = new FileReader();
//파일로드되면 실행
reader.onload = function (e) {
    const price = document.getElementById("price").value;
    const date = document.getElementById("daydate").value;
    const text = e.target.result;
    const data = csvToJSON(text);
    const datap = dateprice(price, data, dateone(date))
    makecheck(uniqmsg(datap))
    for ( i of datap) {
        roulettes.push(i)
    }
    makebtn2('text5')
};

reader.readAsText(input);
};

myForm.addEventListener("submit", function (e) {
    const arr100 = []
    e.preventDefault();
    const checked = document.getElementsByName('check'); 
    for (var checkbox of checked) {  
        if (checkbox.checked)
          arr100.push(checkbox.value)
      } 
    sumSum1(arr100, roulettes)

});

function pickmsg1() {
    const arr100 = []
    const checked = document.getElementsByName('check'); 
    for (var checkbox of checked) {  
        if (checkbox.checked)
          arr100.push(checkbox.value)
      } 
      sumSum1(arr100, roulettes)
}

function pickmsg2() {
    const arr100 = []
    const checked = document.getElementsByName('check');
    for (var checkbox of checked) {  
        if (checkbox.checked)
          arr100.push(checkbox.value)
      } 
    sumSum(arr100, roulettes)

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
function clicknone() {
    document.getElementById("csv").classList.add("hidden");
    document.getElementById("text1").classList.add("hidden");
    document.getElementById("text2").classList.add("hidden");
    document.getElementById("daydate").classList.add("hidden");
    document.getElementById("price").classList.add("hidden");
    document.getElementById("btn").classList.add("hidden");
    document.getElementById("checkbox").classList.remove("hidden");
}

function clicknone1() {
    document.getElementById("checkbox").classList.add("hidden");
    document.getElementById("submitbtn").classList.add("hidden");
    document.getElementById("result1").classList.remove("hidden");
    document.getElementById("result2").classList.remove("hidden");
    document.getElementById("namego").classList.remove("hidden");
    document.getElementById("msggo").classList.remove("hidden");
}

document.getElementById('btn').addEventListener('click', priceCheck);

