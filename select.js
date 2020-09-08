
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
        var citySelect=document.getElementById("city");
        var provinceID;
        var provinceValue=document.getElementById("province").value;
        var cityCounter=0;
        
        var array=[];
        //var array=[];
       
        
        let request = new XMLHttpRequest();
        request.open('GET', 'cities.json', true);
        request.onload = function () {
           const data=JSON.parse(request.responseText);
           for (let i=0; i<data.length; i++)
           {
            array.push({
                "cityID":data[i].cityID,
		        "cityName":data[i].cityName,
		        "provinceID":data[i].provinceID
            }); 
           }
           cityFunction(array);
        }
        request.send();

         
        
        
        }
        cityClickCounter=0;
       // console.log(array.length);
       function cityFunction(cityArray)
       {
        var citySelect=document.getElementById("city");
        var provinceID;
        var provinceValue=document.getElementById("province").value;
        var cityCounter=0;
        if (cityClickCounter==1)
        {
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
                  //citySelect.options[citySelect.options.length] = new Option(cityArray[cityCounter].cityName, cityArray[cityCounter].cityName);    
              option=document.createElement("option");
              option.text=cityArray[cityCounter].cityName;
              option.value=cityArray[cityCounter].cityName;
              citySelect.add(option);

                }
              cityCounter++;
          }
       
    }
    console.log(citySelect.value)
    
    }

    function show()
    {
        data.push(
                {
                    "region":document.getElementById("region").value,
                    "regionIndex":document.getElementById("region").selectedIndex,
                    "province":document.getElementById("province").value,
                    "provinceIndex":document.getElementById("province").selectedIndex
                });

    
            while(dataCounter<data.length)
            {
                var table=document.getElementById("display");
                var row=table.insertRow(dataCounter-1);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                

                cell1.innerHTML=data[dataCounter].region;
                cell2.innerHTML=data[dataCounter].province;
                cell3.innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)">Edit</button>'+' '+
                                 '<button type="button" id="deleteBtn" onclick="deleteFunction(this)">Delete</button>';
                
                dataCounter++;
                
            }
            document.getElementById("province").innerHTML="";
            document.getElementById("region").innerHTML="";
        
            regionClickCounter=0;
            provinceClickCounter=1;
    }

   function editFunction(w)
    {
        
        position=w.parentNode.parentNode.rowIndex;
        document.getElementById("province").innerHTML="";
        document.getElementById("region").innerHTML="";
        regionClickCounter=0;
        provinceClickCounter=1;

        
        var regionSelect = document.getElementById("region");
        selectRegion();
        regionSelect.selectedIndex=data[position+1].regionIndex;   
    
        var provinceSelect = document.getElementById("province");
        selectProvince();
        provinceSelect.selectedIndex=data[position+1].provinceIndex;      


    }
