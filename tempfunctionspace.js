function buyTree(){
    var buyEnabled = "";
    if (level >= 5)
            buyEnabled = "<td><Button id='buyTreeButton' class ='treeClass btn btn-success'><font size='3'>Buy Tree</font></Button></td>";
}

('#main').on('click', '.treeClass', function(){
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
        var tempTree = $('#treeID').detach();
        $('#myItemsRow').append(tempTree);
    }).catch(err =>{
        console.log(err);
    });
});

function collectFruit{}
