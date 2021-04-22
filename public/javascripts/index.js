function SalesOrder(pStoreID, pSalesPersonID, pCdID, pPricePaid) {
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricepaid = pPricePaid;
  }
  var ClientNotes = [];  // our local copy of the cloud data

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tStoreID = document.getElementById("storeID").value;
        var tSalesPersonID = document.getElementById("salesPersonID").value;
        var tCdID = document.getElementById("cdID").value;
        var tPricePaid = document.getElementById("pricePaid")
        var oneSalesOrder = new SalesOrder(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        $.ajax({
            url: '/NewSalesOrder' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneSalesOrder),
            success: function (result) {
                console.log("Added new sales order")
            }

        });
    });

    document.getElementById("get").addEventListener("click", function () {
        updateList()
    });
    
    var idToFind = ""; // using the same value from the find operation for the modify
    // find one to modify
    document.getElementById("find").addEventListener("click", function () {
        var tAssignment = document.getElementById("modSalesOrder").value;
         idToFind = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].storeID === tStoreID) {
                idToFind = ClientNotes[i]._id;
           }
        }
        console.log(idToFind);
 
        $.get("/FindSalesOrder/"+ idToFind, function(data, status){ 
            console.log(data[0].assignment);
            document.getElementById("mStoreID").value = data[0].storeID;
            document.getElementById("mSalePersonID").value= data[0].tSalesPersonID;
            document.getElementById("mGrade").value = data[0].grade;
            document.getElementById("mPricePaid").value = data[0].completed;
           

        });
    });

    // get the server data into the local array
    updateList();

});


function updateList() {
var ul = document.getElementById('listUl');
ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

//var ul = document.createElement('ul')

$.get("/SalesOrder", function(data, status){  // AJAX get
    ClientNotes = data;  // put the returned server json data into our local array

    // sort array by one property
    ClientNotes.sort(compare);  // see compare method below
    console.log(data);
    //listDiv.appendChild(ul);
    ClientNotes.forEach(ProcessOneSalesOrder); // build one li for each item in array
    function ProcessOneSalesOrder(item, index) {
        var li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML=li.innerHTML + index + ": " + " GradedAssignment: " + item.storeID + "  " + item.salesPersonID + ":  " + item.cdID + " Done? "+ item.pricepaid;
    }
});
}

function compare(a,b) {
    if (a.completed == false && b.completed== true) {
        return -1;
    }
    if (a.completed == false && b.completed== true) {
        return 1;
    }
    return 0;
}
