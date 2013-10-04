//Load Jquery Library
$(document).ready(function(){

  console.log(d3);

  //Declare the following variables
  var i   = 10;   // interest
  var m   = 400;   // months
  var f   = 0;   // factor
  var den = 0;   // denominator
  var s   = "0"; // string
  var d   = 0;   // decimal place

  $("#howMuch").click(function() {
    //Check if any portions of the site are blank
    if(document.calform.interest.value=="" || document.calform.months.value=="" || document.calform.payment.value=="") {
      //Display a popup 
      alert("Please fill in all of the required fields.");
    } else {
      //Check to see if any of the following form locations are left blank
      if(document.calform.period.options[0].selected == true) {
        //Multiply the value by 12
        m = document.calform.months.value * 12;
      } else {
        //Month in selected, no calculations needed
        m = document.calform.months.value;
      }

      // Create a Graph on Click

      // create a variable for data and set it equal to an empty array
      var data = [];
      //Declare a variable index; Pass in months; Increment by one month on each loop
      for(var index = 0; index <= m; index++) {
        //Add the new data to the end of the Array
        data.push({ x: index, y: future_value(index) });
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
  });

  //calculate Future Value of an Interst Rate
  function future_value(m) {

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
    document.calform.total.value = "$" + s;
    var value = parseFloat(s);
    return value;
  }
});

