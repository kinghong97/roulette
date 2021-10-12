// 이름
function cutAccount(data) {
    return JSON.stringify(data, ['Account'])
}
// 닉네임
function cutName(data) {
    return JSON.stringify(data, ['Name'])
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
//data1 유니크배열 data2이름메세지배열 data3 날짜
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
    const flatmess = flat(cutMessage(arr2))
    const uniqmess = uniq(flatmess)

    for (i of uniqmess){
        const msg = arr2.filter(function(data){ 
            return data.Message == `${i}`})
        const flataccc =  flat(cutName(msg))
        const uniqacc = uniq(flataccc)
        const countacc = count(flataccc, uniqacc)
        // 메세지 카운트 오름차순
        const sortcount = Object.entries(countacc)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        const allmsg = msg.length
        createTable(i , sortcount, allmsg)
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



    // 테이블만들기
    function createTable(data1, data3, data4) {
        const tablerow = tabler(data3)
        retext1.innerHTML +=  `${data1.split(' - ')[1]}<br>${tablerow}<br>`
    }
    
    function tabler(data) {
        const tablero = []
        for (const [key, value] of Object.entries(data)){
            tablero.push(`- ${key} ${value}<br>`)
        }
        return tablero.join('')
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
let row1 = row.slice(0,4)
row1.push(row.slice(4).join())
for(let j=0; j < header.length; j++){ obj[header[j]] = row1[j]; } 
jsonArray.push(obj); }
return jsonArray; 
}

// 날짜 얻기
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
function clickfirst() {
    document.getElementById("csv").classList.add("hidden");
    document.getElementById("text1").classList.add("hidden");
    document.getElementById("text2").classList.add("hidden");
    document.getElementById("daydate").classList.add("hidden");
    document.getElementById("nametext").classList.add("hidden");
    document.getElementById("submitbtn").classList.add("hidden");
    document.getElementById("firstbtn1").classList.remove("hidden");
    document.getElementById("numberboxdiv").classList.remove("hidden");
}
function clickfirst1() {
    document.getElementById("firstbtn1").classList.add("hidden");
    document.getElementById("numberboxdiv").classList.add("hidden");
    document.getElementById("result1").classList.remove("hidden");
    document.getElementById("result2").classList.remove("hidden");
}
// 메세지 유니크
function uniqmsg(data) {
    return uniq(flat(cutMessage(data)))
}
// 넘버박스만들기
function makenumber(data) {
    document.getElementById("numberbox").innerHTML += `<input id="howcheck" class="howcheck" type="checkbox">중복 가능하면 체크</input> <br />`
    for (i of data) {
        document.getElementById("numberbox").innerHTML +=  `<hr><a class="inputrow"><input id="number" name="number" type="text" alt="${i}" onkeypress='return checkNumber(event)' autocomplete='off'/>${i.split(' - ')[1]} <br /></a>`;
    }
}
function checkNumber(event) {
    if(event.key === '.' 
       || event.key === '-'
       || event.key >= 0 && event.key <= 9) {
      return true;
    }
    
    return false;
  }
// 날짜 내림차순 정렬
function date_descending(a, b) {
    var dateA = new Date(a['날짜']).getTime();
    var dateB = new Date(b['날짜']).getTime();
    return dateA < dateB ? 1 : -1;
    };

    function date_descending1(a, b) {
        var dateA = new Date(a['날짜']).getTime();
        var dateB = new Date(b['날짜']).getTime();
        return dateA < dateB ? 1 : -1;
        };

const roulettes = []

//목록 선택과 개수 선택창
function fristmsg(e) {
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
    makenumber(uniqmsg(bdata))
    for (i of bdata ){
        roulettes.push(i)
    }
    makebtn2('text5')
    document.getElementById("button3").classList.add("hidden");
    document.getElementById("button4").classList.add("hidden");
    document.getElementById("text55").classList.add("hidden");
};

reader.readAsText(input);
};

function fristmsg1() {
    const date = document.getElementById("daydate").value;
    const howCheck = document.getElementById("howcheck");
    const numberarr = {}
    const arrr = []
    const arr = []
    const numbered = document.getElementsByName('number'); 
    if (howCheck.checked){
            // 중복 있을 때
    for (var number of numbered) {  
        if(number.value > 0){
            numberarr [number.alt] = number.value
        }}
        const descending = roulettes.sort(date_descending)
        for( const i in numberarr){

            
            const ac = descending.filter(function(data){ 
                return data.Message == `${i}`})
                if (ac.length = numberarr[i]){
                    arrr.push(ac)
                }
            }
            for(i of arrr){
                for (j of i){
                    if (j === undefined){
                        continue
                    }else {
                        arr.push(j)

                    }
                }
                }
    } else {
        // 중복 없을 때
    for (var number of numbered) {  
        if(number.value > 0){
            numberarr [number.alt] = number.value
        }}
        const descending = roulettes.sort(date_descending)
        
        for( const i in numberarr){
            
            const ac = descending.filter(function(data){ 
                return data.Message == `${i}`})

            function unique(array, propertyName) {
                return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
                }

            const acc = unique(ac, "Account")
                if (acc.length = numberarr[i]){
                    arrr.push(acc)
                }
            }
            for(i of arrr){
                for (j of i){
                    if (j === undefined){
                        continue
                    }else {
                        arr.push(j)

                    }
                }
                }
            }
            const acount = cutAccount(arr)
            const aa = uniq(flat(acount))
            sumSum(aa, arr, dateone(date))

}






document.getElementById('submitbtn').addEventListener('click', fristmsg);
document.getElementById('firstbtn1').addEventListener('click', fristmsg1);
