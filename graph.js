$(document).ready(function(){

	console.log(d3);

  // Prevent page from automatically reloading after submit
  $('#iRateForm').submit(function() {
    return false;
  });

	//Run Code on Click of id="how Much"
  $("#howMuch").click(function () {
    var numOfPeriods = 0;
    //Validates for empty code only. 
    //Loop through all the required fields. If any are blank jump out
    //http://stackoverflow.com/questions/20082915/jquery-required-fields-loop-based-on-css-class
    $('.required').each(function() {
      if($(this).val().length == 0) {
        $('.modal').show();
        $('.modal_content').text('Please fill in the Required Fields');
        //If the first field is filled in make sure to catch blank feild and react occording on the second go through
        clearGraph();
        return false;
      }
    });

    //Clear previous graph
    clearGraph();
    //Adjust the number of periods from years to month
    numOfPeriods = yearToMonthAdj();

    // Change function that is run, depending on what the body of the page is named
    if($('body.withoutInterest')[0]) {
      var futureValue = createiRateGraphNoInterest(numOfPeriods);
    } else if ($('body.withInterest')[0]) {
      var futureValue = createiRateGraph(numOfPeriods);
    } else if ($('body.bothInterest')[0]) {
      var futureValue = createBoth(numOfPeriods);
    }

    testFVforMillionaire(futureValue);
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

  function runFVOrdinaryAnnuity(numOfPeriods, pmt, interest) {
    var factor = 0;
    var futureValue = 0;
    var futureValueString = "0";
    
    //fv = pmt*[(((1+i)^n)-1/i)]
    factor = ((Math.pow((1+interest),numOfPeriods))-1)/interest;
    futureValue = pmt * factor;
    
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

  function createiRateGraph(numOfPeriods) {
    //Declare an empty array to pass data into
    var data = [];
    var interest = $('#interest').val()/100/12;
    var pmt = $('#pmt').val()

    //Declare a variable index; Pass in months; Increment by one month on each loop
    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)
      futureValue = runFVOrdinaryAnnuity(index, pmt, interest);
      data.push({ x: index, y: futureValue });
    }
    console.log(data);
    // Create a new Rickshaw Graph
    var graph = new Rickshaw.Graph( {
      element: document.querySelector("#chart"), 
      //Automatically Scale to Window Size
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

  function createBoth(numOfPeriods) {
    var dataA = [];
    var dataB = [];

    var interest = $('#interest').val()/100/12;
    var pmt = $('#pmt').val()

    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)
      futureValueA = runFvNoInterest(index, pmt);
      dataA.push({ x: index, y: futureValueA });

      futureValueB = runFVOrdinaryAnnuity(index, pmt, interest);
      dataB.push({ x: index, y: futureValueB });
    }

    console.log(dataA);
    console.log(dataB);
    // Create a new Rickshaw Graph
    var graph = new Rickshaw.Graph( {
      element: document.querySelector("#chart"), 
      renderer: 'area',
      stroke: true,
      series: [ {
        data: dataA,
        color: 'steelblue',
      }, {    
        data: dataB,
        color: 'lightblue',
      } ]    
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

    // We look for the total savings of just the Future Value of B
    futureValueString = "$" + futureValueB.formatMoney(2);
    $('#total').val(futureValueString);

    return futureValueB;
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
