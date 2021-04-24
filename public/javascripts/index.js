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

    });

        document.getElementById("one").addEventListener("click", function () {
            let x = getRandomInt(1,24)
            let tStoreID = document.getElementById("StoreID").value = x;
            let tSalesPersonID = document.getElementById("SalesPersonID").value = GetStoreID(x);
            let tValid = document.getElementById("CdID").value = validCD[getRandomInt(0,9)];
            let tPricePaid = document.getElementById("PricePaid").value = getRandomInt(5,15);
            let tHoursPurch = HourOfDay();
            let tDaysPurch = DayOfWeek();
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

        document.getElementById("alot").addEventListener("click", function () {
            for(i=1; i<=500; i++){
            let x = getRandomInt(1,24)
            let tStoreID = document.getElementById("StoreID").value = x;
            let tSalesPersonID = document.getElementById("SalesPersonID").value = GetStoreID(x);
            let tValid = document.getElementById("CdID").value = validCD[getRandomInt(0,9)];
            let tPricePaid = document.getElementById("PricePaid").value = getRandomInt(5,15);
            let tHoursPurch = HourOfDay();
            let tDaysPurch = DayOfWeek();
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
    }
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

    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min;

}


