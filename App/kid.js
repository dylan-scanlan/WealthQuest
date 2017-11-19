/* global $ */


var money = 10.00;
var exp = 20;
var level = 4;
var nextLevel = 35;
var chores = [];
var i = 0;
var treePrice = 8.00;
var treePurchased = false;
var collectFruitButton;
var sellTree;
var buyTreeButton = "";
var canCollect = false;
const choreURL = "https://weatherwear-akovo.c9users.io:8081/api/chore";
$(document).ready(function() {
    $(".Balance").html("$"+money);
    $("#exp").html(exp+"/"+nextLevel);
    $("#level").html(level);
    setInterval(getChores,1000);
    setBuyTreeFunctions();
    $('#TreeID').append(buyTreeButton);
});

$('#main').on('click', '.collect', function(){
    console.log($("#val"+this.id+"").text());
    money += parseFloat($("#val"+this.id+"").text());
    exp += parseFloat($("#val"+this.id+"").text());
    console.log(money);
    
    if(exp >= nextLevel){
        var temp = nextLevel;
        exp = exp-nextLevel;
        nextLevel = temp*2.5;
        level++;
        $("#level").html(level);
        $("#avatar").attr("src","Picture2.png");
    }
    $(".Balance").html("$"+money);
    $("#exp").html(exp+"/"+nextLevel);
    
    var request = new Request(choreURL,{
        method: 'DELETE',
        body: jQuery.param({'name':chores[this.id]}),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
    fetch(request).then(resp =>{
        console.log(resp);
        $("#row"+this.id+"").remove();
    }).catch(err =>{
        console.log(err);
    });
});

$('#main').on('click', '.complete', function(){
    console.log(this);
    // console.log("made it");
    var request = new Request(choreURL,{
        method: 'PUT',
        body: jQuery.param({'name':chores[this.id], 'state': 1}),
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });
    fetch(request).then(resp =>{
        console.log(resp);
        $(this).attr("class","disabled btn");
        $(this).html("Waiting for Parent");
    }).catch(err =>{
        console.log(err);
    });
});


function getChores(){
     $.ajax({
        type: "GET",
        dataType: "json",
        url: choreURL, //url to query data base for each course
        success: function(data){
            updateDisplay(data); //function to update the display of the two lists
        }
    });
};

//Function list -----------------------------------------------------------------------------------

function CompleteButtonClick(){
    
    console.log("works");
};
    
    
function updateDisplay(data){
    $("#choresTableBody").html("");
    chores = [];
    var nameCell = "";
    var descriptionCell = "";
    var valueCell = "";
    var tempRow = "";
    var complete = "";
    i=0;
    for (let value of data){
        chores.push(value.name);
        nameCell = "<td class ='center'><font color = 'black'>"+value.name +"</font></td>";
        descriptionCell = "<td class ='center'><font color = 'black'>" + value.description+"</font></td>";
        valueCell = "<td class ='center'><font color = 'black' id='val"+i+"'>"+ value.value + "</font></td>";
        if(value.state == 1){
            complete  = "<td><Button id='"+i+"'class ='disabled btn '><font size='3'>Waiting for Parent</font></Button></td>";
        }
        else if(value.state == 2){
            complete  = "<td><Button id='"+i+"'class ='collect btn btn-warning'><font size='3'>Collect Coins</font></Button></td>";
        }
        else{
            complete  = "<td><Button id='"+i+"'class ='complete btn btn-success'><font size='3'>Complete</font></Button></td>";
        }
        tempRow = ("<tr id='row"+i+"'>" + nameCell +  descriptionCell  + valueCell + complete + "</tr>");
        $('#choresTableBody').append(tempRow);
        i++;
    }
}

function setBuyTreeFunctions(){
    $('#treePrice').html("Price  $" + treePrice);
    if ( (level >= 2) && money >= treePrice){
            buyTreeButton = "<Button id='canBuyTree' class ='buyTreeClass btn btn-success'><font size='3'>Buy Tree</font></Button>";
    }
    else {
            buyTreeButton = "<Button id='cannotBuyTree' class ='disabled btn '><font size='3'>Waiting for Parent</font></Button>";
    }
    
}

$('#main').on('click', '.buyTreeClass', function(){
    money -= 8;
    $(".Balance").html("$"+money);
    var tempTree = $('#TreeID').detach();
    $('#myItemsRow').append(tempTree);
    $('#canBuyTree').remove();
    treePurchased = true;
    canCollect = false;
    setCollectFruit();
});

function setCollectFruit(){
    $('#canCollectFruit').remove();
    $('#canSellTree').remove();
    if (canCollect){
        collectFruitButton = "<Button id='canCollectFruit' class ='collectFruitClass btn btn-success'><font size='3'>Collect Fruit</font></Button>";
    } else {
        collectFruitButton = "<Button id='canCollectFruit' class ='disabled btn '><font size='3'>Wait to Collect!</font></Button>";
    }
    sellTree = "<Button id='canSellTree' class ='sellTreeClass btn btn-success'><font size='3'>Sell Tree</font></Button>";
    $('#TreeID').append(collectFruitButton);
    $('#TreeID').append(sellTree);
}

$('#main').on('click', '.collectFruitClass', function(){
    money += 1;
    console.log(money);
    $(".Balance").html("$"+money);
    
    canCollect = false;
    $('#canCollectFruit').remove();
    $('#canSellTree').remove();
    setCollectFruit();
});

$('#main').on('click', '.sellTreeClass', function(){
    money += 8;
    $(".Balance").html("$"+money);
    
    $('#TreeID').append(buyTreeButton);
    $('#canSellTree').remove();
    $('#canCollectFruit').remove();
    var tempTree = $('#TreeID').detach();
    $('#shopRow').append(tempTree);
});

$('#main').on('click', '#timeButton', function(){
    canCollect = !canCollect;
    setCollectFruit();
    
    
});


 
