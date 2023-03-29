//https://gramthanos.github.io/jsCalendar/
//https://github.com/GramThanos/jsCalendar/

class Bokning {
    constructor(b_id, namn, tel, tid, datum, webtid ){
        this.b_id = b_id;
        this.namn = namn;
        this.tel = tel;
        this.tid = tid;
        this.datum = datum;
        this.webtid = webtid;
    }

}

var kallender = document.getElementById("kallender");
var minKallender = jsCalendar.new(kallender);

let tid_input = document.getElementById("tid");
tid_input.defaultValue = "09:00"; 
let datum_input = document.getElementById("input_datum");
let namn_input = document.getElementById("namn_input");
let tel_input = document.getElementById("tel_input");
let webtid_input = document.getElementById("webtid");

let bokning_table_body = document.getElementById("table_body");

const now = new Date();
now.getDate(); 
datum_input.value = skapaDatumString(now);
getDayBokinDataDb(datum_input.value);


let vald_dag_bokningar = [];

minKallender.onDateClick(function(event, date){
    const weekday = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
    
     let dateFormat = skapaDatumString(date);
    //datum_input.value = date.toString();
    datum_input.value=dateFormat;
    getDayBokinDataDb(dateFormat);
    //let dagnr = d.getDay();
    console.log(dateFormat);
      
});

function skapaDatumString(t_date){
    let getYear = t_date.toLocaleString("default", { year: "numeric" });
    let getMonth = t_date.toLocaleString("default", { month: "2-digit" });
    let getDay = t_date.toLocaleString("default", { day: "2-digit" });
    let dateFormat = getYear + "-" + getMonth + "-" + getDay;

    return dateFormat;
}



async function delButtonClick(e) {
    const sourceElement = e.target;
    console.log(`id= ${sourceElement.id}`);

    await delDayBoking(vald_dag_bokningar, datum_input.value, sourceElement.id);

}

async function bokaTid(){

    if (namn_input.value !== ""){
        const now = Date.now(); 
        const id = now.toString()
        console.log(`daum= ${now}`)
        //console.log(`boka tid array Json= ${JSON.stringify(vald_dag_bokningar)}`);
        let t_datum = datum_input.value;
        let bokning = new Bokning(id, namn_input.value, tel_input.value, tid_input.value, t_datum, webtid_input.checked);

        vald_dag_bokningar.push(bokning);
  
        await setDayBokingDataDb(vald_dag_bokningar, t_datum );
        //console.log(`Json= ${JSON.stringify(vald_dag_bokningar)}`);

    }
    else
        alert("Namn Saknas!")

}

function listDayBokings(){
  
    //console.log(`längd= ${vald_dag_bokningar.length}`)

    let tr_string = "";
    
    vald_dag_bokningar.forEach(dbokn => {
        tr_string += `<tr>
        <td>${dbokn.tid}</td><td>${dbokn.namn}</td><td>${dbokn.tel}</td><td>${dbokn.b_id}</td><td><input type="checkbox" name="webb_id" id="webb_id"></td><td><button onclick="delButtonClick(event)" name="${dbokn.b_id}" id="${dbokn.b_id}">avboka</button></td>
        </tr>`    
    });

    bokning_table_body.innerHTML=tr_string;
}

let bokingSort = (a, b) => {
    if (a.tid < b.tid) {
        return -1;
      }
      if (a.tid > b.tid) {
        return 1;
      }
      return 0;

}

//CRUD funtions, Hämtar data från Backend-------------------------------------------------------------------------------------

async function getDayBokinDataDb(t_date){
    let dagbokningar = []

    try {
          
        dagbokningar = await JSON.parse(localStorage.getItem(t_date) );

        //Om billistan  är tom Null från localStorage
        if (dagbokningar == null){
            vald_dag_bokningar = []
            console.log(`hämtar ${dagbokningar}`)
        }
        else{
            console.log(`hämtar2 ${dagbokningar}`)
            //dagbokningar.sort((a, b) => a.namn > b.namn);//Sort funkar ej
            dagbokningar.sort(bokingSort);//funkar
            
            vald_dag_bokningar = dagbokningar;
        }

        listDayBokings(); 
    }
    catch (e){
        
        console.log(`Fel: ${e}`)
    }

    //return dagbokningar;
}

async function setDayBokingDataDb(t_bokningar_dag, t_date){
//console.log(`setB ${t_bokning.namn}`)

    localStorage.setItem(t_date , JSON.stringify(t_bokningar_dag));
    //listDayBokings();
    getDayBokinDataDb(t_date);
}

async function delDayBoking(t_bokningar_dag, t_date, t_id){

    try{

        const del_t_bokningar_dag = await t_bokningar_dag.filter((o, i) => o.b_id !== t_id)//e.target.id
        localStorage.setItem(t_date , JSON.stringify(del_t_bokningar_dag));
        getDayBokinDataDb(t_date);
        

       

    }
    catch(e){
        alert(`Kunde inte tabort bokning: ${e}`)
    }
}

