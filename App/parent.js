//url for all entries
const choreURL = "https://weatherwear-akovo.c9users.io:8081/api/chore";
const routineURL = "";

var chores = [];
var i = 0;

$(document).ready(function() {
    setInterval(getChores,1000);
    
    $("#addChoreButton").click(function(event) {
        event.preventDefault();
        var choreNameInput=encodeHTML($('#choreNameInput').val());
        var choreDescriptionInput = encodeHTML($('#choreDescriptionInput').val());
        var choreValueInput = encodeHTML($('#choreValueInput').val());
        sendEntries(choreNameInput,choreDescriptionInput,choreValueInput);
    });
    
    $('#main').on('click', '.confirm', function(){
    var request = new Request(choreURL,{
        method: 'PUT',
        body: jQuery.param({'name':chores[this.id], 'state': 2}),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
    fetch(request).then(resp =>{
        console.log(resp);
        $(this).attr("class","disabled btn");
        $(this).html("Waiting for Child to Collect...");
    }).catch(err =>{
        console.log(err);
    });
});

});


//to sanitize user input
//https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function getChores(){
     $.ajax({
        type: "GET",
        dataType: "json",
        url: choreURL, //url to query data base for each course
        success: function(data){
            console.log(data);
            updateDisplay(data); //function to update the display of the two lists
        }
    });
};

function encodeHTML(originalString) {
    return originalString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function sendEntries(cName,cDescription,cValue) {
    var request = new Request(choreURL,{
        method: 'POST',
        body: jQuery.param({'name':cName,'description':cDescription, 'value': cValue}),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
    fetch(request).then(resp =>{
        console.log(resp);
        addChore(cName,cDescription,cValue);
    }).catch(err =>{
        console.log(err);
    });

}

function updateDisplay(data){
    $("#choresTableBody").html("");
    var tempTablebody = "";
    var nameCell = "";
    var descriptionCell = "";
    var valueCell = "";
    var tempRow = "";
    var complete = "";
    chores = [];
    i=0;
    for (let value of data){
        chores.push(value.name);
        nameCell = "<td class ='center'>" + value.name +"</font></td>";
        descriptionCell = "<td class ='center'>" + value.description+"</font></td>";
        valueCell = "<td class ='center'>" + value.value+"</font></td>";
        if (value.state == 1){
            complete  = "<td><Button id='"+i+"'class ='confirm btn btn-success'><font size='3'>Confirm</font></Button></td>";
        }
        else if(value.state == 2){
            complete  = "<td><Button id='"+i+"'class ='disabled btn'><font size='3'>Waiting for Child to Collect...</font></Button></td>";
        }
        else{
            complete  = "<td><Button id='"+i+"'class ='disabled btn'><font size='3'>Waiting...</font></Button></td>";
        }
        tempRow = ("<tr>" + nameCell +  descriptionCell  + valueCell+ complete+"</tr>");
        $('#choresTableBody').append(tempRow);
        i++;
    }

}

function addChore(cName, cDescription,cValue){
    
    var nameCell = "<td class ='center'>" + cName +"</font></td>";
    var descriptionCell = "<td class ='center'>" + cDescription +"</font></td>";
    var valueCell = "<td class ='center'>" + cValue +"</font></td>";
    var tempRow = ("<tr>" + nameCell +  descriptionCell  + valueCell +"</tr>");
    $('#choresTableBody').append(tempRow);
    getChores();
}