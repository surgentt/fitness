//This Code will only run if you input values at all locations

//Load Jquery Library
$(document).ready(function(){

	console.log(d3);

	var pmt 				 			= 100; //Payments Per Month
	var numOfPeriods 			= 2;   //Length of Investment Default Year, Adjustment made for year/month depending on iRateForm choice. 
  var interest		 			= 10;  //Interest rate in %
	var futureValue  			= 0;   //How much money expect to save
	var fvNoCompouding    = 0;   //Future Value of Savings, without compounding
  var decimalPoint			= 0;   //Set a decimal place for final answer
	var futureValueString = "0"; //The future value in a string format, so it can be returned to the HTML doc
	
  //Run Code on Click of id="how Much"
	$("#howMuch").click(function() {
		//Validates for empty code only. 
		if(document.iRateForm.pmt.value==="" || document.iRateForm.numOfPeriods.value==="" || document.iRateForm.interest.value==="") {
			alert("Please fill in all of the required fields.")
		} else {
			yearToMonthAdj();
			runFutureValueUserInput();
      //runFVUserInputNoIrate();
			//runFutureValueDefault();
		}
      irateGraph();
  });

  //Adjust year to month based on form. 
	function yearToMonthAdj() {
			//Adjust the num of years to Monthly PMT
    if(document.iRateForm.period.options[0].selected == true) {
      //Multiply the value by 12
      numOfPeriods = document.iRateForm.numOfPeriods.value * 12;
    } else {
      //Month in selected, no calculations needed
      numOfPeriods = document.iRateForm.numOfPeriods.value;
    }
  }

  //Run future value calculation based on User Input
  function runFutureValueUserInput(numOfPeriods) {
		futureValue = document.iRateForm.pmt.value*
			((Math.pow((1+(document.iRateForm.interest.value/100)),numOfPeriods)-1)/
			(document.iRateForm.interest.value/100));
  	//Find the location of the deciaml point
  	decimalPoint	= String(futureValue).indexOf(".");
  	futureValueString = String(futureValue).substring(0,(decimalPoint+3));
  	document.iRateForm.total.value = "$" + futureValueString;
  	//Fixe this code
  	var value = parseFloat(futureValueString);
  	return value;
  }

  function runFVUserInputNoIrate() {
    fvNoCo = document.iRateForm.pmt.value*document.iRateForm.numOfPeriods.value
    alert(fvNoCompouding);
  }

  function irateGraph() {
    //http://code.shutterstock.com/rickshaw/
  	// create a variable for data
    var data = [];
    //Declare a variable index; Pass in months; Increment by one month on each loop
    for(var index = 0; index <= numOfPeriods; index++) {
      //Add the new data to the end of the Array

      //runFutureValueUserInput is too broad of a function for this too work!!
      data.push({ x: index, y: runFutureValueUserInput(index) });
    }
    console.log(data);
    // Create a new Rickshaw Graph
      var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"), 
        width: 500, 
        height: 200, 
        series: [{
          color: 'steelblue',
          name:  'total savings',
          data: data
        }]
      });

      //Render the graph
      graph.render();
  }

  //Run future value calculation on default values. 
  function runFutureValueDefault(numOfPeriods) {
		futureValue = pmt*((Math.pow((1+(interest/100)),numOfPeriods)-1)/(interest/100));
  	decimalPoint	= String(futureValue).indexOf(".");
  	futureValueString = String(futureValue).substring(0,(decimalPoint+3));
  	document.iRateForm.total.value = "$" + futureValueString;
  	alert(futureValueString);
  }

});

//QUESTIONS??
  //Something is broken with my numOfPeriods and Parameters Function here, Please help!!
    //This broke after implementing my graphing feature.

  //I find interest rate twice from the Documet. Is this a bad idea???
  //I am using the html reference name=irateForm name=pmt. Should to be an ID for javascript??
  //How can I add in "," to the Future Value String??
  //Why isn't my function runFVUserInputNoIrate working, when in a FUNCTION??
  //Where should I be using more jQuery??
  //How can I make this form run automatically?
    //Connect SLIDERs to page
  //How does passing in numOfPeriods, really work??


//CSS
  //Where can I get some difinitive advice on css alignment within a page??
  //Where can I find some cool colors, to build this with. 

//Too Do
  //Realign Page Elements => Graph, Next Button
  //Add Axis to Graph
  //Create second Graph that works with the sliders
  //Create a within CSS page alert when $1 million is made


//fvNoCompouding = pmt * numOfPeriods;
//ealert(fvNoCompouding);

//runFVUserInputNoIrate();

//Why is this responding with 0??
//function runFVUserInputNoIrate(numOfPeriods) {
//  yearToMonthAdj();
//  fvNoCompouding = pmt * numOfPeriods;
//  console.log(fvNoCompouding);
  //alert(fvNoCompouding);
//}

