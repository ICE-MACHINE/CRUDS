"use strict"
// variables geting from html
let total=document.getElementById(`total`);
let a=document.getElementById(`ipt`);
let b=document.getElementById(`opt`);
let c=document.getElementById(`adt`);
let day = document.getElementById(`day`);
let month= document.getElementById(`month`);
let year = document.getElementById(`year`);
let stt = document.querySelector(`#status`);
let totalAmount=document.querySelector(`.totalAmount`);

onload = function () {
    day.focus();
    let table = this.document.querySelector("table");
    let emptyTable = this.document.querySelector(".emptyTable");
    if (array.length === 0) {
        emptyTable.style.display = "flex";
        table.style.display = "none";
    } else {
        emptyTable.style.display = "none";
        table.style.display = "table";
    }
}

let x;
//for searching (default search mode)
let sm = `day`;
// count the total dayling amount
function ttl() {
    if(a.value != `` && +a.value>0){
        if (+b.value>=0 && b.value != ``) {
            total.innerHTML= a.value*1-b.value*1+c.value*1;
            total.style.background=`#0b4`;
            total.style.color=`aqua`;
        }
        else{
            total.innerHTML= `00`;
            total.style.background=`#602`;
            total.style.color=`red`;
        }
    }
  else {
        total.innerHTML= `00`;
        total.style.background=`#602`;
        total.style.color=`red`;
  }
}
// update the status in eash amount 
/**
 * if the total greater or equal then the output amount the status will be good else the status will be bad
 */
 function s() {
    ttl();
    if (a.value != `` && +a.value>0) {
        if(+b.value>=0 && b.value != ``){
      if (total.innerHTML>= +b.value) {
        stt.value=`good`;
      }
        else {
        stt.value=`bad`;
        }
    }
    else  stt.value=``;
}
 else  stt.value=``;
}
// the array of the data
let array =[];
// mode (create/update)
let md=`create`;
if (localStorage.arrayData != null) {
    array = JSON.parse(localStorage.arrayData);
}
else array =[];
submit.onclick=function () {
    let obj = {
        dy : day.value,
        mnth : month.value,
        yr : year.value,
        totl : total.innerHTML,
        st : stt.value,
        in : a.value,
        ot : b.value,
        ad : c.value,
    };
    if(year.value>2022 && stt.value!=`` &&array.length<=50 && month.value>0 && month.value<13 && (total.innerHTML)%5==0){
        if (month.value!=2 && month.value<8 && month.value%2==0 && day.value>0 && day.value<31){
            if(md===`create`){
                array.push(obj);
            }
            else{
                array[x]=obj;
                md=`create`;
                submit.innerHTML=`Create`;
            }
        }
        else  if (month.value>7 && month.value%2==1 && day.value>0 && day.value<31){
            if(md===`create`){
                array.push(obj);
            }
            else{
                array[x]=obj;
                md=`create`;
                submit.innerHTML=`Create`;
            }
        }
        else if (month.value!=2 && month.value<8 && month.value%2==1 && day.value>0 && day.value<32){
            if(md===`create`){
                array.push(obj);
            }
            else{
                array[x]=obj;
                md=`create`;
                submit.innerHTML=`Create`;
            }
        }
        else  if (month.value>7 && month.value%2==0 && day.value>0 && day.value<=31){
            if(md===`create`){
                array.push(obj);
            }
            else{
                array[x]=obj;
                md=`create`;
                submit.innerHTML=`Create`;
            }
        }
        else  if (month.value==2 && day.value>0 && day.value<30){
            if(md===`create`){
                array.push(obj);
            }
            else{
                array[x]=obj;
                md=`create`;
                submit.innerHTML=`Create`;
            }
        }
        clr_dt();
    }
    localStorage.setItem(`arrayData` , JSON.stringify(array));
    readdata();
}
// clear the input fields and focus on day input
function clr_dt(){
    total.innerHTML=``;
    day.value=``;
    month.value=``;
    year.value=``;
    b.value=``;
    a.value=``;
    c.value=``;
    stt.value=``;
    day.focus();
}
// read data from local storage and display it in the table
function readdata() {
    let tbl=``;
    ttl();
    for (let i = 0; i < array.length; i++) {
        tbl+=`
        <tr>
        <th>${i*1+1}</th>
        <td>${array[i].dy}</td>
        <td>${array[i].mnth}</td>
        <td>${array[i].yr}</td>
        <td>${array[i].totl}</td>
        <td>${array[i].st}</td>
        <td><button onclick='update(${i})'>updt</button></td>
        <td><button onclick='dldt(${i})'>dlt</button></td>
        </tr>
        `;
    }
    document.querySelector(`#tbod`).innerHTML= tbl;
    // clear all div
    let clall=document.getElementById(`clearAll`);
    // table
    let table = document.querySelector("table");
    // empty table div
    let emptyTable = document.querySelector(".emptyTable");

    if (array.length >0) {
        clall.innerHTML=`<button onclick="call()">Clear All (${array.length})</button>`;
        table.style.display = "table";
        emptyTable.style.display = "none";
    }
    else {
        clall.innerHTML=``;
        table.style.display = "none";
        emptyTable.style.display = "flex";
    }
    calculeTotal();
}
// window onload
readdata();
// delete specific data
function dldt(i) {
    array.splice(i,1);
    localStorage.arrayData = JSON.stringify(array);
    readdata();
}
// clear all data
function call() {
   localStorage.clear() ;
   array.splice(0);
   readdata();
}
// update specific data
function update(i) {
    day.value=array[i].dy;
    x=i;
    md=`update`;
    month.value=array[i].mnth;
    year.value=array[i].yr;
    stt.value=array[i].st;
    a.value=array[i].in;
    b.value=array[i].ot;
    c.value=array[i].ad;
    total.innerHTML=array[i].totl;
    submit.innerHTML=`Update`;
    readdata();
    scroll({
        top:0,
        behavior:`smooth`,
    });
}
// searching
let srsh= document.getElementById(`searsh`);
// search function
function sersh(id) {
    if (id==`searshday`) {
        sm=`day`;
        }
    else if (id==`searshmonth`) {
           sm=`month`;
    }
     else if (id==`searshyear`) {
           sm=`year`;
     }
    else if (id==`searshtotal`) {
         sm=`total`;
         }
    srsh.focus();
    srsh.value=``;
    readdata();
    srsh.placeholder=`search by ${sm}`;
}
function searshdt(v) {
    let tbl=``;
    for (let i = 0; i < array.length; i++) {
        if (sm==`day`  && array[i].dy.includes(v)) {
           tbl+=`
                <tr>
                <th>${i*1+1}</th>
                <td>${array[i].dy}</td>
                <td>${array[i].mnth}</td>
                <td>${array[i].yr}</td>
                <td>${array[i].totl}</td>
                <td>${array[i].st}</td>
                <td><button onclick='update(${i})'>updt</button></td>
                <td><button onclick='dldt(${i})'>dlt</button></td>
                </tr>
              `;
        }
      else  if (sm==`month` && array[i].mnth.toLowerCase().includes(v.toLowerCase())) {
             tbl+=`
                <tr>
                <th>${i*1+1}</th>
                <td>${array[i].dy}</td>
                <td>${array[i].mnth}</td>
                <td>${array[i].yr}</td>
                <td>${array[i].totl}</td>
                <td>${array[i].st}</td>
                <td><button onclick='update(${i})'>updt</button></td>
                <td><button onclick='dldt(${i})'>dlt</button></td>
                </tr>
              `;
        }
       else  if (sm==`year` && array[i].yr.includes(v)) {
             tbl+=`
                <tr>
                <th>${i*1+1}</th>
                <td>${array[i].dy}</td>
                <td>${array[i].mnth}</td>
                <td>${array[i].yr}</td>
                <td>${array[i].totl}</td>
                <td>${array[i].st}</td>
                <td><button onclick='update(${i})'>updt</button></td>
                <td><button onclick='dldt(${i})'>dlt</button></td>
                </tr>
              `;
        }
      else  if (sm==`total` && array[i].totl.includes(v)) {
             tbl+=`
                <tr>
                <th>${i*1+1}</th>
                <td>${array[i].dy}</td>
                <td>${array[i].mnth}</td>
                <td>${array[i].yr}</td>
                <td>${array[i].totl}</td>
                <td>${array[i].st}</td>
                <td><button onclick='update(${i})'>updt</button></td>
                <td><button onclick='dldt(${i})'>dlt</button></td>
                </tr>
              `;   
        }
    }
    document.querySelector(`#tbod`).innerHTML= tbl;
}
function calculeTotal() {
    let f=0;
    for (let k = 0; k <array.length; k++) {
        f+= +(array[k].totl);
    }
    totalAmount.innerHTML=`${f}`;
}
calculeTotal();