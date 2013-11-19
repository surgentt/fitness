$(document).ready(function(){

	console.log(d3);

  // Prevent page from automatically reloading after submit
  $('#iRateForm').submit(function() {
    return false;
  });

	//Run Code on Click of id="how Much"
	$("#howMuch").click(function(ev) {
		var numOfPeriods = 0; 
    console.log("Gloabl Starting N =" + numOfPeriods);

    //Validates for empty code only.
		if($("#pmt").val().length == 0 || $("#numOfPeriods").val().length == 0 ){
			$('.modal').show();
      $('.modal_content').text('Please fill in the Required Fields');
		} else {
      //Clear previous graph
      clearGraph();
      //Adjust the number of periods from years to month
      numOfPeriods = yearToMonthAdj();
      //Declare a variable for the final future value
			var futureValue = createiRateGraphNoInterest(numOfPeriods);
      //Test if were rich
      testFVforMillionaire(futureValue);
 		}						
  });

  function clearGraph() {
    $('#y_axis').empty();
    $('#x_axis').empty();
    $('#chart').empty();
  }

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
    //When Initital Run, numOfPeriods is passed in. 
    futureValue = pmt*numOfPeriods;
  
    return futureValue;
  }


  function createiRateGraphNoInterest(numOfPeriods) {
    //Declare an empty array to pass data into
    var data = [];
    var futureValue = 0;
    var pmt = $('#pmt').val()
    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)
      futureValue = runFvNoInterest(index, pmt);
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
      $('.modal').show();
      $('.modal_content').text('Your a Millionaire, but wan\'t that pretty hard');
    } else {
      $('.modal').show();
      $('.modal_content').text('Try and Save More');
    }
  }

});
