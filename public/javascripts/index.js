function SalesOrder(pStoreID, pSalesPersonID, pCdID, pPricePaid, pHourPurch, pDayPurch ) {
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.hourPurch = pHourPurch;
    this.dayPurch = pDayPurch;

  }
  var ClientNotes = [];  // our local copy of the cloud data
  let validCD = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453,623451]
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("get").addEventListener("click", function () {
        let x = getRandomInt(1,24)
        document.getElementById("StoreID").value = x;
        document.getElementById("SalesPersonID").value = GetStoreID(x);
        document.getElementById("CdID").value = validCD[getRandomInt(0,9)];
        document.getElementById("PricePaid").value = getRandomInt(5,15);
        document.getElementById("Hours").value = DayOfWeek();
        document.getElementById("Days").value = HourOfDay();
         
        document.getElementById("one").addEventListener("click", function () {
            let x = getRandomInt(1,24)
            let tStoreID = document.getElementById("StoreID").value = x;
            let tSalesPersonID = document.getElementById("SalesPersonID").value = GetStoreID(x);
            let tValid = document.getElementById("CdID").value = validCD[getRandomInt(0,9)];
            let tPricePaid = document.getElementById("PricePaid").value = getRandomInt(5,15);
            let tHoursPurch =document.getElementById("Hours").value = HourOfDay();
            let tDaysPurch = document.getElementById("Days").value = DayOfWeek();
            var oneSalesOrder = new SalesOrder(tStoreID, tSalesPersonID, tValid, tPricePaid, tHoursPurch, tDaysPurch); 
            console.log(oneSalesOrder);            
        $.ajax({
            url: '/NewSales' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneSalesOrder),
            success: function (result) {
                console.log("added SalesOrder")
            }

        });
    });
    });
    function GetStoreID(which){
        let storeList = [98053, 98007, 98077, 98055, 98011, 98046 ]
        let pointer = 0;
        while(which > 4)
        {
            pointer++;
            which = which - 4;
        }
        return storeList[pointer];
    };

    function DayOfWeek(){
        var d = new Date();
        var weekday=new Array(7);
        weekday[0]="Sunday";
        weekday[1]="Monday";
        weekday[2]="Tuesday";
        weekday[3]="Wednesday";
        weekday[4]="Thursday";
        weekday[5]="Friday";
        weekday[6]="Saturday";

        return weekday[d.getDay()];
    }
    
    function HourOfDay(){
        var d = new Date();
        return d.getHours();
    };
    //document.getElementById("get").addEventListener("click", function () {
    //    updateList()
    //});
    
    // var idToFind = ""; // using the same value from the find operation for the modify
    // // find one to modify
    // document.getElementById("find").addEventListener("click", function () {
    //     var tAssignment = document.getElementById("modSalesOrder").value;
    //      idToFind = "";
    //     for(i=0; i< ClientNotes.length; i++){
    //         if(ClientNotes[i].storeID === tStoreID) {
    //             idToFind = ClientNotes[i]._id;
    //        }
    //     }
    //     console.log(idToFind);
 
    //     $.get("/FindSalesOrder/"+ idToFind, function(data, status){ 
    //         console.log(data[0].assignment);
    //         document.getElementById("mStoreID").value = data[0].storeID;
    //         document.getElementById("mSalePersonID").value= data[0].tSalesPersonID;
    //         document.getElementById("mGrade").value = data[0].grade;
    //         document.getElementById("mPricePaid").value = data[0].completed;
           

    //     });
    // });

    // get the server data into the local array
    //updateList();

});


// function updateList() {
// var ul = document.getElementById('listUl');
// ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

// //var ul = document.createElement('ul')

// $.get("/SalesOrder", function(data, status){  // AJAX get
//     ClientNotes = data;  // put the returned server json data into our local array

//     // sort array by one property
//     ClientNotes.sort(compare);  // see compare method below
//     console.log(data);
//     //listDiv.appendChild(ul);
//     ClientNotes.forEach(ProcessOneSalesOrder); // build one li for each item in array
//     function ProcessOneSalesOrder(item, index) {
//         var li = document.createElement('li');
//         ul.appendChild(li);

//         li.innerHTML=li.innerHTML + "StoreID: " + item.storeID + "  " + "SalesPersonID:" + " " + item.salesPersonID + " CdID: " + item.cdID + " PricePaid: "+ item.pricepaid;
//     }
 //});
//}


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;

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
