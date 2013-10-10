$(document).ready(function(){

	console.log(d3);

	//Run Code on Click of id="how Much"
	$("#howMuch").click(function() {
		var numOfPeriods      = 0; 
    console.log("Gloabl Starting N =" + numOfPeriods);

    //Validates for empty code only. 
		if(document.iRateForm.pmt.value==="" || document.iRateForm.numOfPeriods.value==="") {
			alert("Please fill in all of the required fields.");
		} else {
			//Must Trun First
      numOfPeriods = yearToMonthAdj();
      console.log(numOfPeriods);
			runFvNoInterest(numOfPeriods);
			createiRateGraphNoInterest(numOfPeriods);
 		}						
  });

  function yearToMonthAdj() {
			//Adjust the num of years to Monthly PMT
    if(document.iRateForm.yearOrMonth.options[0].selected == true) {
      //Multiply the value by 12
      return document.iRateForm.numOfPeriods.value * 12;
    } else {
      //Month in selected, no calculations needed
      return document.iRateForm.numOfPeriods.value;
    }
  }

  function runFvNoInterest(numOfPeriods) {
		var futureValue       = 0;
    var futureValueString = "0";
    var decimal = 0;
    //When Initital Run, numOfPeriods is passed in. 
    futureValue = document.iRateForm.pmt.value*numOfPeriods;
    
    futureValueString = String(futureValue);
    document.iRateForm.total.value = "$" + futureValueString;
    
    return futureValue;

  }

  function createiRateGraphNoInterest(numOfPeriods) {
    var data = [];
    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)
      data.push({ x: index, y: runFvNoInterest(index) });
    }
    console.log(data);
    // Create a new Rickshaw Graph
      var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"), 
        //Automatically Scale to window size
        //width: 500, 
        //height: 200, 
        series: [{
          color: 'steelblue',
          name:  'total savings',
          data: data
        }]
      });

      //var x_axes = new Rickshaw.Graph.Axis.Time( { 
      //  graph: graph,
      //});
      //Render the graph
      graph.render();

  }

});

//Too Doo!! 
  //Insert "," into final answer
  //Create Axis for Graph
  //Reposition Graph to Center of Page
  //Create Alert with CSS background Blurr if Savings are aover $1 Million
