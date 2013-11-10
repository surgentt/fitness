$(document).ready(function(){

	console.log(d3);

  $('#iRateForm').submit(function() {
    return false;
  });

	//Run Code on Click of id="how Much"
	$("#howMuch").click(function() {
		var numOfPeriods      = 0; 
    console.log("Gloabl Starting N =" + numOfPeriods);

    //Validates for empty code only.
    //This jQuery selection here isn't working 
		if($("#pmt").val().length == 0 || $("#numOfPeriods").val().length == 0 ){
			alert("Please fill in all of the required fields.");
		} else {
			//Must Trun First
      numOfPeriods = yearToMonthAdj();
      clearGraph();

			var futureValue = createiRateGraphNoInterest(numOfPeriods);
      testFVforMillionaire(futureValue);
 		}						
  });

  function yearToMonthAdj() {
			//Adjust the num of years to Monthly PMT
      //$('#iRateForm').val() === 'Years'
    var periods =  $('#numOfPeriods').val();

    if($('#yearOrMonth').val() == 'y') {
      //Multiply the value by 12
      return periods * 12;
    } else {
      //Month in selected, no calculations needed
      return periods;
    }
  }

  function runFvNoInterest(numOfPeriods, pmt) {
		var futureValue       = 0;
    var futureValueString = "0";
    var decimal = 0;
    //When Initital Run, numOfPeriods is passed in. 
    futureValue = pmt*numOfPeriods;
  
    return futureValue;
  }

  function clearGraph() {
    $('#y_axis').empty();
    $('#x_axis').empty();
    $('#chart').empty();
  }

  function createiRateGraphNoInterest(numOfPeriods) {

    clearGraph();

    var futureValue = 0;
    var data = [];
    var pmt = $('#pmt').val()
    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)

      futureValue = runFvNoInterest(index, pmt) ;
      data.push({ x: index, y: futureValue});
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

      var x_axis = new Rickshaw.Graph.Axis.X( { 
        graph: graph,
        element: document.getElementById('x_axis')
      });

      var y_axis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y_axis'),
      });

      graph.render();

      futureValueString = "$" + futureValue.formatMoney(2);
      $('#total').val(futureValueString);

      return futureValue;
  }

  function testFVforMillionaire(futureValue) {

    if (futureValue > 1000000) {
      alert("Great Job");
    } else {
      alert("You should save some more");
    }
  }

});

//Too Doo!! 
  //Should I be using document.getElementById Instead??
  //Insert "," into final answer
  //Create Axis for Graph
  //Reposition Graph to Center of Page
  //Create Alert with CSS background Blurr if Savings are aover $1 Million
