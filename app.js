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
tid_input.defaultValue = "9:00"; 
let datum_input = document.getElementById("input_datum");
let namn_input = document.getElementById("namn_input");
let tel_input = document.getElementById("tel_input");
let webtid_input = document.getElementById("webtid");

minKallender.onDateClick(function(event, date){
    const weekday = ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"];
    

    //https://linuxhint.com/format-date-as-yyyy-mm-dd-in-javascript/
    let getYear = date.toLocaleString("default", { year: "numeric" });
    let getMonth = date.toLocaleString("default", { month: "2-digit" });
    let getDay = date.toLocaleString("default", { day: "2-digit" });
    let dateFormat = getYear + "-" + getMonth + "-" + getDay;

    

    //const d_add1dag = d.setDate(d.getDate() + 1)
    //const tdate =  d.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: ''});

    //let dateFormat = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
    //let dateFormat  = d.toISOString().slice(0, 10);
    //let dateFormat  = date.toISOString().slice(0, 10);

    //let dateFormat = DateTime.fromJSDate(new Date(date)).toFormat('yyyy-MM-dd')
    //(new Date()).format('yyyy-MM-dd')
    //let dateFormat = date.format('yyyy-MM-dd')
   // let dateFormat = (new Date(date)).format('yyyy-MM-dd')
   //ISO Date 	"2015-03-25" (The International Standard)
    //let dateFormat = d.format('yyyy-MM-dd')

    //datum_input.value = date.toString();
    datum_input.value=dateFormat;

    //let dagnr = d.getDay();
    console.log(dateFormat);
    //console.log(weekday[dagnr]);

});

function bokaTid(){

    if (namn_input.value !== ""){
        const now = Date.now(); 
        const id = now.toString()
        
        let bokning = new Bokning(id, namn_input.value, tel_input.value, tid_input.value, datum_input.value, webtid_input.checked);

        console.log(`Json= ${JSON.stringify(bokning)}`);

    }
    else
        alert("Namn Saknas!")

}

function avBokaTid(){

}

