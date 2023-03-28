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


let vald_dag_bokningar = [];

minKallender.onDateClick(function(event, date){
    const weekday = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
    

    //https://linuxhint.com/format-date-as-yyyy-mm-dd-in-javascript/
    let getYear = date.toLocaleString("default", { year: "numeric" });
    let getMonth = date.toLocaleString("default", { month: "2-digit" });
    let getDay = date.toLocaleString("default", { day: "2-digit" });
    let dateFormat = getYear + "-" + getMonth + "-" + getDay;

    //datum_input.value = date.toString();
    datum_input.value=dateFormat;
    getDayBokinDataDb(dateFormat);
    //let dagnr = d.getDay();
    console.log(dateFormat);
      


});

let delButtonClick = (e) => {
    const sourceElement = e.target;
    console.log(`id= ${sourceElement.id}`);
}

function bokaTid(){

    if (namn_input.value !== ""){
        const now = Date.now(); 
        const id = now.toString()
        console.log(`boka tid array Json= ${JSON.stringify(vald_dag_bokningar)}`);
        let t_datum = datum_input.value;
        let bokning = new Bokning(id, namn_input.value, tel_input.value, tid_input.value, t_datum, webtid_input.checked);

        vald_dag_bokningar.push(bokning);
  
        setDayBokingDataDb(vald_dag_bokningar, t_datum );
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

//CRUD funtions Hämtar data från Backend----------

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

}

