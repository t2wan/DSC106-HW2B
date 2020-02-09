// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: []
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function readEntries(){


	var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];

	var i;
	for (i = 0; i < generateEntries().length; i++) {
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = generateEntries()[i][0];
		cell2.innerHTML = generateEntries()[i][1];
		cell3.innerHTML = generateEntries()[i][2];
		cell4.innerHTML = generateEntries()[i][3];
		cell5.innerHTML = "$"+ Number(Number(generateEntries()[i][2]*DINGUS_PRICE)+Number(generateEntries()[i][3]*WIDGET_PRICE)).toFixed(2);
	  }
	  var Dingus = 0;
	  var Widget = 0;
	  var j;
	  for (j = 0; j < generateEntries().length; j++){
		  Dingus = Dingus + generateEntries()[j][2];
		  Widget = Widget + generateEntries()[j][3];
	  }
	  var Sales = (Dingus *DINGUS_PRICE + Widget*WIDGET_PRICE).toFixed(2)
	  document.getElementById("st1").textContent = Dingus;
	  document.getElementById("st2").textContent = Widget;
	  document.getElementById('st4').innerHTML = Sales;

	

	store = JSON.parse(localStorage['orderHistory'])
	let orders = store.orderHistory;
	for (let i=0;i<orders.length;i++){
		let row = table.insertRow();
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		cell1.innerHTML = orders[i][0];
		cell2.innerHTML = orders[i][1];
		cell3.innerHTML = orders[i][2];
		cell4.innerHTML = orders[i][3];
		cell5.innerHTML = orders[i][4];
		document.getElementById("st1").textContent = (Number(document.getElementById("st1").textContent) + Number(cell3.innerHTML));
		document.getElementById("st2").textContent = (Number(document.getElementById("st2").textContent) + Number(cell4.innerHTML));
		document.getElementById("st4").textContent = (Number(document.getElementById("st4").textContent) + Number(cell5.innerHTML.substring(1,))).toFixed(2);

	}

	document.getElementById('firstcircle').style.strokeDasharray =  (Number(document.getElementById("st1").textContent)/ (Number(document.getElementById("st1").textContent) + Number(document.getElementById("st2").textContent)))* 32 * Math.PI + ' ' +10000
	var tot = Number(document.getElementById("st1").textContent) + Number(document.getElementById("st2").textContent)
	document.getElementById('secondfraction').textContent = ((Number(document.getElementById("st1").textContent)/tot)*100).toFixed(0) + '%'
	document.getElementById('firstfraction').textContent = (100-Number(document.getElementById('secondfraction').textContent.slice(0,-1)))+'%'


	var dates = []

	for (let i=0;i<orders.length;i++){
		dates.push(orders[i][1])
	}
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}
	
	var unique = dates.filter( onlyUnique ).slice(-7);

	for(let i=0;i<unique.length;i++){
		document.getElementById('date'+i).innerHTML = unique[i];
		var ds = [];
		var ws = [];
		for(let j=0;j<orders.length;j++){
			if(orders[j][1]==unique[i]){
				ds.push(Number(orders[j][2]));
				ws.push(Number(orders[j][3]));
			}
		}
		var sumd = ds.reduce(function(a, b){
			return a + b;
		}, 0);
		var sumw = ws.reduce(function(a, b){
			return a + b;
		}, 0);
		var frac = sumw/(sumw+sumd)
		document.getElementById('blue'+i).style.height = 810*frac;
		document.getElementById('red'+i).style.height = 810;
		document.getElementById('bluepercent'+i).innerHTML = (frac*100).toFixed(0)+'%'
		document.getElementById('redpercent'+i).innerHTML = (100-Number(document.getElementById('bluepercent'+i).innerHTML.slice(0,-1)))+'%'
	}



}



function update() {
	var Dingus = document.getElementById('Dingus')
	document.getElementById("st1").textContent = Number(document.getElementById("st1").textContent)+Number(Dingus.value)
	var Widget = document.getElementById('Widget')
	document.getElementById("st2").textContent = Number(document.getElementById("st2").textContent)+Number(Widget.value)
	var Sales =  (DINGUS_PRICE * Dingus.value + WIDGET_PRICE * Widget.value).toFixed(2)
	document.getElementById('st4').innerHTML = (Number(document.getElementById('st4').innerHTML) + Number(Sales)).toFixed(2)
		// Find a <table> element with id="myTable":
	var table = document.getElementById("mytable").getElementsByTagName('tbody')[0];

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow();

	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	// Add some text to the new cells:
	var currentdate = new Date();
	var Monthlength = (currentdate.getMonth()+1).toString().length;
	if (Monthlength<2){
		var month = '0' + (currentdate.getMonth()+1).toString();
	}
	else{
		var month = currentdate.getMonth()+1;
	}

	var Daylength = (currentdate.getDate()).toString().length;
	if (Daylength<2){
		var date = '0' + (currentdate.getDate()).toString();
	}
	else{
		var date = currentdate.getDate();
	}

	var datetime =   month  + "/" + date + "/" + currentdate.getFullYear()
	cell1.innerHTML = store.orderHistory.length+3;
	cell2.innerHTML = datetime;
	cell3.innerHTML = Dingus.value;
	cell4.innerHTML = Widget.value;
	cell5.innerHTML = "$"+ Sales;


	document.getElementById('firstcircle').style.strokeDasharray =  (Number(document.getElementById("st1").textContent)/ (Number(document.getElementById("st1").textContent) + Number(document.getElementById("st2").textContent)))* 32 * Math.PI + ' ' +10000
	var tot = Number(document.getElementById("st1").textContent) + Number(document.getElementById("st2").textContent)
	document.getElementById('secondfraction').textContent = ((Number(document.getElementById("st1").textContent)/tot)*100).toFixed(0) + '%'
	document.getElementById('firstfraction').textContent = (100-Number(document.getElementById('secondfraction').textContent.slice(0,-1)))+'%'




	store.orderHistory.push([cell1.innerHTML,cell2.innerHTML,cell3.innerHTML,cell4.innerHTML,cell5.innerHTML])
	localStorage.setItem('orderHistory',JSON.stringify(store))


	store = JSON.parse(localStorage['orderHistory'])
	let orders = store.orderHistory;

	var dates = []

	for (let i=0;i<orders.length;i++){
		dates.push(orders[i][1])
	}
	function onlyUnique(value, index, self) { 
		return self.indexOf(value) === index;
	}
	
	var unique = dates.filter( onlyUnique ).slice(-7);



	for(let i=0;i<unique.length;i++){
		document.getElementById('date'+i).innerHTML = unique[i];
		var ds = [];
		var ws = [];
		for(let j=0;j<orders.length;j++){
			if(orders[j][1]==unique[i]){
				ds.push(Number(orders[j][2]));
				ws.push(Number(orders[j][3]));
			}
		}
		var sumd = ds.reduce(function(a, b){
			return a + b;
		}, 0);
		var sumw = ws.reduce(function(a, b){
			return a + b;
		}, 0);
		var frac = sumw/(sumw+sumd)
		document.getElementById('blue'+i).style.height = 810*frac;
		document.getElementById('red'+i).style.height = 810;
		document.getElementById('bluepercent'+i).innerHTML = (frac*100).toFixed(0)+'%'
		document.getElementById('redpercent'+i).innerHTML = (100-Number(document.getElementById('bluepercent'+i).innerHTML.slice(0,-1)))+'%'

	}



	document.getElementById('Dingus').value = 0
	document.getElementById('Widget').value = 0
	document.getElementById('DingusTotal').value = 0.00
	document.getElementById('WidgetTotal').value = 0.00
	document.getElementById('Total').value = 0.00
	document.getElementById('Order').disabled = true;











}


function lala(){
	document.getElementById('DingusTotal').value = (Number(document.getElementById('Dingus').value)*DINGUS_PRICE).toFixed(2)
	document.getElementById('Total').value = (Number(document.getElementById('DingusTotal').value) + Number(document.getElementById('WidgetTotal').value)).toFixed(2);
	if (document.getElementById('Dingus').value > 0){
		document.getElementById('Order').disabled = false;
	}

}

function lalala(){
	document.getElementById('WidgetTotal').value = (Number(document.getElementById('Widget').value)*WIDGET_PRICE).toFixed(2)
	document.getElementById('Total').value = (Number(document.getElementById('DingusTotal').value) + Number(document.getElementById('WidgetTotal').value)).toFixed(2);
	if (document.getElementById('Widget').value > 0){
		document.getElementById('Order').disabled = false;
}
}

function clearr(){
	document.getElementById('Dingus').value = 0
	document.getElementById('Widget').value = 0
	document.getElementById('DingusTotal').value = 0.00
	document.getElementById('WidgetTotal').value = 0.00
	document.getElementById('Total').value = 0.00
	document.getElementById('Order').disabled = true;
}


