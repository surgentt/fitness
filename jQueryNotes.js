$(document).ready(function(){

	// Make the slide fade in one 1 seconds
	$('#slide').hide().fadeIn(1000);

	//jQuery Proper Selectors!!!

	//There is also a way to get element by HTML Tag

	 //Correct
	 var linkList = $('a');

	 //Incorrect
	 var linkList = document.getElementsByTagName(
	 	'a');

	 //Get Element by ID

	//Corect Syntax to get elements from the DOM, using JQuery
	var messagePara = $('#message');

	//Incorrect outdated way
	var messagePara = document.getElementById('#message');

	// Get element by Class
	$('.submeanu').hide();

	// Advanced Selectors

	// Decendent Selectors
	  //This will select all <a> elements within the nav bar
	$('#nabar a')

	// Child Selectors
	$('body > p')

	// Adjacent Sibling
	 // Select a tag, that appears directly after another tag
	$('h2 + div')



	//jQuery Filters
	$('tr:even')

	$('p:first')

	$('p:last')

	//Don't find something
	$('a:not(.navButton)')

	$('li:has(a)')

	//Contains a certain string
	$('a:contains(Click Me!)')

	//Find a hidden div and then show it
	$('div:hidden').show();

	// Oposite of visible is hidden
	$('div:visible').hide();


	//Chaining Functions
	$('#popUp').width(300).height(300);

	$('#popUp').width(300).height(300).text('Hi!').fadeIn(1000);


	//How to remove a dialog box from the page
	$('#popup').remove();


	//Classes

	// You can ADD a class to a page
	$('a[href^="http://"]').addClass('externalLink');

	// You can REMOVE a class from a page
	$('#alertBox').removeClass('highlight');


	//Reading and Changing CSS Properties

	//Determine the current value of a CSS property
	  //Ex. the background color of the #main page
	var bgColor = $('#main').css('background-color');
	    //Jquery only return color in rgba values. !IMPORTANT

	//Set a CSS Value
	$('body').css('font-size', '200%');

	//Read the current site properties then change it.
	  //Ex. Make the font 120% bigger than it previously was.
	var baseFont = $('body').css('font-size');
    baseFont = parseInt(baseFont,10);
    $('body').css('font-size',baseFont * 2);

    //Changing Multiple CSS Properties at Once
    $('#highlightedDiv').css('background-color','#FF0000');
    $('#highlightedDiv').css('border','2px solid #FE0037');

    //Use the following so that you don't have to selecet both at once
    { 'background-color' : '#FF0000', 'border' : '2px solid #FE0037' }



    // Reading, Setting, and Removing HTML Attributes
    // Handing HTML attributes is done through - the attr() and removeAttr() functions
    var imageFile = $('#banner img').attr('src');
    $('#banner img').attr('src','images/newImage.png');
    $('body').removeAttr('bgColor');

    //Anonymous Functions

    function() {
    	//code goes here
    }

    //User the .each to declare an anoyomous function
    $('selector').each(function(){
    	//code goes here
    });

    // Each
    $('img').each(function() {
       alert('I found an image');
	});

	//Get A page readu to work

	$(document).ready(function() {
      // programming goes inside this
      // anonymous function
	});


});
