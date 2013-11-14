$(document).ready(function(){

  console.log(d3);

  //Run Code on Click of id="how Much"
  $("#howMuch").click(function() {
    var numOfPeriods      = 0; 
    console.log("Gloabl Starting N =" + numOfPeriods);

    //Validates for empty code only. 
    if(document.iRateForm.pmt.value==="" || document.iRateForm.numOfPeriods.value==="" || document.iRateForm.interest.value==="") {
      alert("Please fill in all of the required fields.");
    } else {
      numOfPeriods = yearToMonthAdj();
      createiRateGraph(numOfPeriods);
      testFVforMillionaire();
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
      //Find the location of the decimal Point
    futureValueString = futureValue.formatMoney(2);
    document.iRateForm.total.value = "$" + futureValueString;    
    
    return futureValue;
  }

  function createiRateGraph(numOfPeriods) {
    var data = [];
    //Declare a variable index; Pass in months; Increment by one month on each loop
    for(var index = 0; index <= numOfPeriods; index++) {
      //Instead of passing in numOfPeriods, index is passed into runFvNoInterest)
      data.push({ x: index, y: runFVOrdinaryAnnuity(index) });
    }
    console.log(data);
    // Create a new Rickshaw Graph
      var graph = new Rickshaw.Graph( {
        element: document.querySelector("#chart"), 
        //Automatically Scale to Window Size
        //width: 500, 
        //height: 200, 
        series: [{
          color: 'steelblue',
          name:  'total savings',
          data: data
        }]
      });

      //Render the graph

      graph.render();
  }

  function testFVforMillionaire() {
    var finalFV = document.iRateForm.total.value;
    finalFV = finalFV.substr(1,30);
    finalFV = parseInt(finalFV);
    if (finalFV > 1000000) {
      alert("Wow, wasn't that way easier with Interest");
    } else {
      alert("Save some more money for that Big Vacation you want to take");
    }
  }

});

//Too Doo!! 
  //Make my formula run as quickly as possible

  //Insert "," into final answer
  //Create Axis for Graph
  //Reposition Graph to Center of Page
  //Create Alert with CSS blur, if Savings are over $1 Million
