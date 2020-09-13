    var regionClickCounter=0;
    var provinceClickCounter=0;
    var cityClickCounter=0;
    var barangayClickCounter=0;
    var data=[{}];
    var dataCounter=1;
    var selectedOption;
    var selectedOption2;
    var editClickCounter=0;
    var position;
   
  
    function selectRegion(){
    var regionCounter=0;
    var regionSelect = document.getElementById("region");
 
        if(regionClickCounter==0){
            while (regionCounter<regionSourceArray.length)
            {
            regionSelect.options[regionCounter] = new Option(regionSourceArray[regionCounter].RegionName, regionSourceArray[regionCounter].RegionName);
            regionCounter++;
            }
        }
    
    document.getElementById("province").innerHTML="";
    document.getElementById("city").innerHTML="";
    document.getElementById("barangay").innerHTML="";
    regionClickCounter=1;
    provinceClickCounter=1;
    
    }

    function selectProvince(){
        var regionID;
        var regionValue=document.getElementById("region").value;
        var provinceSelect = document.getElementById("province");
        var provinceCounter=0;

        if (provinceClickCounter==1)
        {
            provinceSelect.innerHTML="";
            for (var rp=0; rp<regionSourceArray.length; rp++)
            {
                if (regionValue==regionSourceArray[rp].RegionName)
                {
                    regionID=regionSourceArray[rp].RegionID;
                }
            }

            while (provinceCounter<provinceSourceArray.length)
            {
                if (regionID==provinceSourceArray[provinceCounter].regionID)
                {
                    provinceSelect.options[provinceSelect.options.length] = new Option(provinceSourceArray[provinceCounter].provinceName, provinceSourceArray[provinceCounter].provinceName);    
                }
                provinceCounter++;
            }
        }
        provinceClickCounter=0;
        cityClickCounter=1;
        document.getElementById("city").innerHTML="";
        document.getElementById("barangay").innerHTML="";
        
    }
    function selectCity()
    {
        if (cityClickCounter==1)
        {
            /*let cityRequest = new XMLHttpRequest();
            cityRequest.open('GET', 'cities.json', true);
            cityRequest.onload = function () 
            {
                const cityData=JSON.parse(cityRequest.response);
                populateCity(cityData);
            }
            cityRequest.send();*/

            $(document).ready(function () {
                $.getJSON('city.json', function (data) {
                    console.log(data);
                });
            });
                
        }
        cityClickCounter=0;
        barangayClickCounter=1;
        document.getElementById("barangay").innerHTML="";
    }

    function populateCity(cityData)
    {
        for (let i=0; i<cityData.length; i++)
        {
            cityArray=cityData;
            var citySelect=document.getElementById("city");
            var provinceID;
            var provinceValue=document.getElementById("province").value;
            var cityCounter=0;
            citySelect.innerHTML="";
            for (var pc=0; pc<provinceSourceArray.length; pc++)
            {
                if (provinceValue==provinceSourceArray[pc].provinceName)
                {
                    provinceID=provinceSourceArray[pc].provinceID;
                }
            }

            while (cityCounter<cityArray.length)
            {
                var cityOption;
                if (provinceID==cityArray[cityCounter].provinceID)
                {
                    cityOption=document.createElement("option");
                    cityOption.text=cityArray[cityCounter].cityName;
                    cityOption.value=cityArray[cityCounter].cityName;
                    citySelect.append(cityOption);
                }    
                cityCounter++;
            }
        }
    }
    

    function show()
    {
        data.push(
                {
                    "region":document.getElementById("region").value,
                    "regionIndex":document.getElementById("region").selectedIndex,
                    "province":document.getElementById("province").value,
                    "provinceIndex":document.getElementById("province").selectedIndex,
                    "city":document.getElementById("city").value,
                    "cityIndex":document.getElementById("city").selectedIndex,
                    "barangay":document.getElementById("barangay").value,
                    "barangayIndex":document.getElementById("barangay").selectedIndex
                });

    
            while(dataCounter<data.length)
            {
                var table=document.getElementById("display");
                var row=table.insertRow(dataCounter-1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                

                cell1.innerHTML=data[dataCounter].region;
                cell2.innerHTML=data[dataCounter].province;
                cell3.innerHTML=data[dataCounter].city;
                cell4.innerHTML=data[dataCounter].barangay;
                cell5.innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)">Edit</button>'+' '+
                                 '<button type="button" id="deleteBtn" onclick="deleteFunction(this)">Delete</button>';
                
                dataCounter++;
                
            }
            document.getElementById("province").innerHTML="";
            document.getElementById("region").innerHTML="";
            document.getElementById("city").innerHTML="";
            document.getElementById("barangay").innerHTML="";
        
            regionClickCounter=0;
            provinceClickCounter=1;
            cityClickCounter=1;
            barangayClickCounter=1;
    }

   function editFunction(w)
    {
        
        position=w.parentNode.parentNode.rowIndex;
        document.getElementById("province").innerHTML="";
        document.getElementById("region").innerHTML="";
        document.getElementById("city").innerHTML="";
        document.getElementById("barangay").innerHTML="";
        regionClickCounter=0;
        provinceClickCounter=1;
        cityClickCounter=1;
        barangayClickCounter=1;
        
        var regionSelect = document.getElementById("region");
        selectRegion();
        regionSelect.selectedIndex=data[position+1].regionIndex;   
    
        var provinceSelect = document.getElementById("province");
        selectProvince();
        provinceSelect.selectedIndex=data[position+1].provinceIndex;

        if (cityClickCounter==1)
        {
            
            $(document).ready(function(){
                $.getJSON("cities.json", function(cityData){
                    populateCity(cityData)
                }).fail(function(){
                    console.log("An error has occurred.");
                });
            });
            }
                
        
        cityClickCounter=0;
        barangayClickCounter=1;

       
    }
