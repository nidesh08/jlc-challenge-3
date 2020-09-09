
    var regionClickCounter=0;
    var provinceClickCounter=0;
    var cityClickCounter=0;
    var barangayClickCounter=0;
    var data=[{}];
    var dataCounter=1;
    var selectedOption;
    var selectedOption2;
    var editClickCounter=0;
   
  
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
    }
    function selectCity()
    {
        if (cityClickCounter==1)
        {
                let request = new XMLHttpRequest();
                request.open('GET', 'cities.json', true);
                request.onload = function () 
                {
                const data=JSON.parse(request.response);
                for (let i=0; i<data.length; i++)
                {
                        cityArray=data;
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
                            let option;
                            if (provinceID==cityArray[cityCounter].provinceID)
                            {
                                // citySelect.options[citySelect.options.length] = new Option(cityArray[cityCounter].cityName, cityArray[cityCounter].cityName);    
                            option=document.createElement("option");
                            option.text=cityArray[cityCounter].cityName;
                            option.value=cityArray[cityCounter].cityName;
                            citySelect.append(option);
                            //citySelect.append('option id="'+cityArray[cityCounter].cityID+'">' +cityArray[cityCounter].cityName+'</option>');
                            }
                        cityCounter++;
                        }
                    }
                }
                request.send();
        }
        
            cityClickCounter=0;
            barangayClickCounter=1;

            var cityValue=document.getElementById("city").selectedIndex;
            console.log(cityValue)
    }
    function selectBarangay()
    {
        if (barangayClickCounter==1)
        {
            let request1 = new XMLHttpRequest();
                request1.open('GET', 'cities.json', true);
                request1.onload = function () 
                {
                    const citydata=JSON.parse(request1.response);
                }
                
                
                let request = new XMLHttpRequest();
                request.open('GET', 'barangays.json', true);
                request.onload = function () 
                {
                const data=JSON.parse(request.response);
                for (let i=0; i<data.length; i++)
                {
                        barangayArray=data;
                        var barangaySelect=document.getElementById("barangay");
                        var cityID;
                        var cityValue=document.getElementById("city").value;
                        var barangayCounter=0;
                        barangaySelect.innerHTML="";
                        for (var cb=0; cb<citydata.length; cb++)
                        {
                            if (cityValue==citydata[cb].cityName)
                            {
                                cityID=citydata[cb].cityID;
                            }
                        }
                        while (barangayCounter<barangayArray.length)
                        {
                            let option;
                            if (cityValue==barangayArray[barangayCounter].cityID)
                            {
                                // citySelect.options[citySelect.options.length] = new Option(cityArray[cityCounter].cityName, cityArray[cityCounter].cityName);    
                            option=document.createElement("option");
                            option.text=barangayArray[barangayCounter].barangayName;
                            option.value=barangayArray[barangayCounter].barangayName;
                            barangaySelect.append(option);
                            //citySelect.append('option id="'+cityArray[cityCounter].cityID+'">' +cityArray[cityCounter].cityName+'</option>');
                            }
                        barangayCounter++;
                        }
                    }
                }
                request.send();
        }
        
            barangayClickCounter=0;

            var barangayValue=document.getElementById("barangay").selectedIndex;
            console.log(barangayValue)
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
        
        var citySelect=document.getElementById("city");
        selectCity();
        citySelect.selectedIndex=data[position+1].cityIndex;

        var barangaySelect=document.getElementById("barangay");
        barangayCity();
        barangaySelect.selectedIndex=data[position+1].barangayIndex;

    }
