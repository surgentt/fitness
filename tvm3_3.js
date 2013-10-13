$(document).ready(function(){

  console.log(d3);

  //Run Code on Click of id="how Much"
  $("#howMuch").click(function() {
    var numOfPeriods      = 0; 
    console.log("Gloabl Starting N =" + numOfPeriods);

    //Validates for empty code only. 
    if(document.iRateForm.pmt.value==="" || document.iRateForm.numOfPeriods.value==="" || document.iRateForm.interest.value==="") {
      alert("Please fill in all of the required fields.")
    } else {
      numOfPeriods = yearToMonthAdj();
      createiRateGraph(numOfPeriods);
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

  function runFVOrdinaryAnnuity(numOfPeriods) {
    var interest = 0;
    var pmt = 0;
    var factor = 0;
    var futureValue = 0;
    var futureValueString = "0";
    
    //fv = pmt*[(((1+i)^n)-1/i)]
    interest = document.iRateForm.interest.value/100/12;
    factor = ((Math.pow((1+interest),numOfPeriods))-1)/interest;
    futureValue = document.iRateForm.pmt.value * factor;

    //On First run output the result to DOM
    futureValueString = futureValue.formatMoney(2);
    document.iRateForm.total.value = "$" + futureValueString;    
    
    return futureValue;
  }

  function createiRateGraph(numOfPeriods) {
    var dataA = [];
    var dataB = [];
    for(var index = 0; index <= numOfPeriods; index++) {
      dataB.push({ x: index, y: runFvNoInterest(index)      });
      dataA.push({ x: index, y: runFVOrdinaryAnnuity(index) });
    }
    console.log(dataA);
    console.log(dataB);
    // Create a new Rickshaw Graph
      var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"), 
        //Automatically Scale to window size
        //width: 500, 
        //height: 200, 
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

      //var axes = new Rickshaw.Graph.Axis

      //Render the graph
      graph.render();
  }

});

//Too doo
  // Get ths graph looking correct