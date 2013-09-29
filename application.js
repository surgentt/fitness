/*Interest Rate Calculator*/

//Original:  Michael C. Hundt (mchundt@nglic.com)
//Web Site:  http://www.cinet.net/~mhundt/mystuff.htm 

//Declare the following variables
var i = 0; // interest
var m = 0; // months
var f = 0; // factor
var den = 0;
var s = "0"; // string
var d = 0; // decimal place

function CalcA() {
	//Check to see if any of the following form locations are left blank
	if(document.calform.interest.value=="" || document.calform.months.value=="" || document.calform.payment.value=="") {
		//Display a popup 
		alert("Please fill in all of the required fields.");
	} else {
		//If year is selected (2nd spot) do something
		if(document.calform.period.options[0].selected == true) {
			//Multiply the value by 12
			m = document.calform.months.value * 12;
			} else {
			//Month in selected, no calculations needed
			m = document.calform.months.value;
		}
		//   ((i/100)+1)^.08333)-1
		i = Math.pow(((document.calform.interest.value/100)+1),.0833333)-1;
		// Create the denominator
		den = i / (i+1);
		//   ((1+i)^m) -1
		f = Math.pow((i+1),m)-1;
		// divide the factor by the denom
		f /= den;
		// Multiply the facor by the pmt
		// Something to do with getting the value of the payment
		f *= document.calform.payment.value;
		// Find the position of "."  in the converted tring x
		d = String(f).indexOf(".");
		// Create a string "s" add a decimal point in
		s = String(f).substring(0,(d+3));
		// Output the total.value with a $ in front of the s string.
		document.calform.total.value = "$" + s;
		//Test to see if we made 1 Million Dollars

		//Add Section, so Show how much of this was earning on Interst Alone

		if (s > 1000000) {
			alert("You made over a MILLION DOLLARS!!")
		} else {
			alert("You have not saved enough!!")
		}
	}
}

//Make this function automatically add "," in the correct locations

//How do I call a function within another function?
function Millionaire() {
	if (s > 1000000) {
			alert("You made over a MILLION DOLLARS!!")
		} else {
			alert("You have not saved enough!!")
		}
}


