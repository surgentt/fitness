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
    if($("#pmt").val().length == 0 || $("#numOfPeriods").val().length == 0 || $("#interest").val().length == 0) {
      $('.modal').show();
      $('.modal_content').text('Please fill in the Required Fields');
    } else {
      //Clear previous graph
      clearGraph();
      //Adjust the number of periods from years to month
      numOfPeriods = yearToMonthAdj();
      //Declare a variable for the final future value
      var futureValue = createiRateGraph(numOfPeriods);
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

  function runFVOrdinaryAnnuity(numOfPeriods, pmt, interest) {
    var factor = 0;
    var futureValue = 0;
    var futureValueString = "0";
    
    //fv = pmt*[(((1+i)^n)-1/i)]
    factor = ((Math.pow((1+interest),numOfPeriods))-1)/interest;
    futureValue = pmt * factor;
    
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

  function testFVforMillionaire() {
    if (futureValue > 1000000) {
      $('.modal').show();
      $('.modal_content').text('Your a Millionaire and wasn\'t that was way easier.');
    } else {
      $('.modal').show();
      $('.modal_content').text('Please Try Again');
    }
  }

});

//Too Doo!! 
  //Make my formula run as quickly as possible

  //Insert "," into final answer
  //Create Axis for Graph
  //Reposition Graph to Center of Page
  //Create Alert with CSS blur, if Savings are over $1 Million
