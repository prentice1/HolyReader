var bookXML;

function getXML(document) {
    bookXML = document;
    buildMenu();
}

function lookUp(title){
  $("#searchresults").empty();
  console.log(title);
  $(bookXML).find("book").each(function(){
	var thisTitle = $(this).find("bktlong").text();
	console.log("F:"+thisTitle);
	if (thisTitle==title) {
	    console.log("Match");
		//part of what ensures chapter titles will only be printed out once
		var pastCh = "";
				
		$(this).find("v").each(function(){
		var thisVerse = $(this).text();
		var thisCh = $(this).parent().find("chtitle").text();
		//console.log("D: "+thisCh);        //tests
		//console.log("E: "+thisVerse);
				
		if (thisCh !== pastCh) {
		$("#searchresults").append('<p>'+
		thisCh+'<br />'+'</p>'	);
		}
		//prints out the chapter title/number only if it was not already printed out	
		pastCh = thisCh;
		//it knows if the chapter number was already printed out because this var 
		//contains the last chapter title/number that was printed out
		
		$("#searchresults").append('<p>'+
		thisVerse+'<br />'+'</p>');
		});				
	}
  });
} // test comment

function buildMenu(){
    var menuItems="";
    $(bookXML).find("book").each(function(){
	var title = $(this).find("bktlong").text();
	menuItems+="<li><a href='#'>"+title+"</a></li>";
    });
    console.log(menuItems);
    $("#bookList").html(menuItems);

    $(".dropdown-menu li a").click(function(){
	console.log("pick!"+$(this).text());
	$(this).parents(".btn-group").find('.selection').text($(this).text());
	lookUp($(this).text());
    });
}

$(document).ready(function(){
    $.ajax({
	url: 'bible.xml', // name of file you want to parse
	dataType: "xml",
	success: getXML,
	error: function(){alert("Error: Something went wrong");}

    });
});


