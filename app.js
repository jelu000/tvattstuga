//https://gramthanos.github.io/jsCalendar/
//https://github.com/GramThanos/jsCalendar/

var kallender = document.getElementById("kallender");

var minKallender = jsCalendar.new(kallender);

let datum_input = document.getElementById("input_datum");


minKallender.onDateClick(function(event, date){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(date);
    datum_input.value = date.toString();
    let dagnr = d.getDay();
    console.log(weekday[dagnr]);

});

