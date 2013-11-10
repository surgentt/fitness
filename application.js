$(document).ready(function(){

	/////////////////////////
	//Answer's to Questions//
	/////////////////////////

	// All Slides Appear on the Page
	$('#slide').hide().fadeIn(500);

	//Slide 2 Questions
	$("#20today").click(function() {
		alert("You didn't earn any interest");
	});

	$("#25twoWeeks").click(function() {
		alert("This represents an interest rate of 20% per Year");
	});

	$("#aDollarToday").click(function() {
		alert("That was Easy");
	});

	$("#aDollarTomorrow").click(function() {
		alert("Great thanks for giving me free Interest");
	});

	//Slide 4 & Slide 7
	$("#Higher").click(function() {
		alert("Correct");
	});
	$("#Lower").click(function() {
		alert("Incorrect");
	});

	//Helper Method to format money
	Number.prototype.formatMoney = function(c, d, t){
  	var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

});

