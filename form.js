    var Interests=[];
    var data=[{}]; 
    var dataCounter=1;
    var editClickCounter=0;
    var regionID;
    var provinceClickCounter=0;
    var regionClickCounter=0;
    var regionSelectedOption;
    var provinceSelectedOption;

    function selectRegion()
    {
        var i=0;
        var regionSelect = document.getElementById("region");
    
            if(regionClickCounter==0){
                region.innerHTML=""; 
                while (i<regionSourceArray.length)
                {
                regionSelect.options[regionSelect.options.length] = new Option(regionSourceArray[i].RegionName, regionSourceArray[i].RegionName);
                i++;
                }
            }     
        document.getElementById("province").innerHTML="";   
        provinceClickCounter=1;
        regionClickCounter=1;
    }

    function selectProvince()
    {
        var regionID;
        var regionValue = document.getElementById("region").value;
        var p=0;
        var r=0;
        var provinceSelect = document.getElementById("province");
        var check=false;
        if (provinceClickCounter==1)
        {
            for (var rp=0; rp<regionSourceArray.length; rp++)
            {
                if (regionValue==regionSourceArray[rp].RegionName)
                {
                    regionID=regionSourceArray[rp].RegionID;
                }
            }

            while(check==false)
            {
                if(regionID==provinceSourceArray[r][p].regionID)
                {
                    for(p=0; p<provinceSourceArray[r].length; p++)
                    {
                        provinceSelect.options[p] = new Option(provinceSourceArray[r][p].provinceName, provinceSourceArray[r][p].provinceName);    
                        
                    } 
                    check=true;  
                } 
                r++;     
            }
        }
        provinceClickCounter=0;
    }


    function interestFunction()
    {
        var interestList=document.getElementById("interestDisplay");
        for (x=0; x<interestSourceArray.length; x++)
        {
            interestList.innerHTML+='<input type="checkbox" id="'+interestSourceArray[x].interestId+'" name="interest" value="'+interestSourceArray[x].interestId+'">' +
            '<label for="'+interestSourceArray[x].interestId+'">' + interestSourceArray[x].interestName + '<label>' + '<br>'
        }
    }

    function submitForm()
    {
        var pattern = /[0-9]/g;
        var test = pattern.test(document.getElementById("firstName").value);
        var test1= pattern.test(document.getElementById("lastName").value);
        var test2= pattern.test(document.getElementById("middleName").value);
        regionSelectedOption = document.getElementById("region").options[document.getElementById("region").selectedIndex];
        provinceSelectedOption = document.getElementById("province").options[document.getElementById("province").selectedIndex];
        
        if (test==true)
        {
            document.getElementById("msg").innerHTML="First name cannot have numbers.";
            document.getElementById("msg1").innerHTML="";
            document.getElementById("msg2").innerHTML="";
        }
        else if(test1==true)
        {
            document.getElementById("msg").innerHTML="";
            document.getElementById("msg1").innerHTML="Last name cannot have numbers.";
            document.getElementById("msg2").innerHTML="";
        }
        else if(test2==true)
        {
            document.getElementById("msg").innerHTML="";
            document.getElementById("msg1").innerHTML="";
            document.getElementById("msg2").innerHTML="Middle name cannot have numbers.";  
        }
        else
        {
            document.getElementById("msg").innerHTML="";
            document.getElementById("msg1").innerHTML="";
            document.getElementById("msg2").innerHTML="";

            if ((document.getElementById("firstName").value!="")&&(document.getElementById("lastName").value!="")&&
            (document.getElementById("birthDate").value!="")&&(document.getElementById("genderMale").checked || document.getElementById("genderFemale").checked)&&
            (document.getElementById("region").value!="")&&(document.getElementById("province").value!="")&&(document.getElementById("city").value!="")&&
            (document.getElementById("barangay").value!="")&&(document.getElementById("street").value!=""))
            {              
                if (editClickCounter==0)
                {
                    var gender=document.getElementsByName("gender");
                    for(var g = 0; g < gender.length; g++)
                    {
                        if(gender[g].checked)
                        {
                            var radioCheck = gender[g].value;
                        }
                    }

                    var interest=document.getElementsByName("interest");
                    for(var i = 0; i < interest.length; i++)
                    {
                        if(interest[i].checked)
                        {
                            Interests.push({
                            "interestId":interest[i].value
                        })
                    }
                    }

                    var itn=0;
                    var idToName=[];
                    var interestIdToName;
                    for(itn=0; itn<Interests.length; itn++)
                    {
                        interestIdToName=Interests[itn].interestId;
                        interestIdToName-=1;
                        idToName.push(interestSourceArray[interestIdToName].interestName);
                    }
                    
                    data.splice(dataCounter, data.length,
                        {
                            "firstName":document.getElementById("firstName").value,
                            "lastName":document.getElementById("lastName").value,
                            "middleName":document.getElementById("middleName").value,
                            "birthDate":document.getElementById("birthDate").value,
                            "gender":radioCheck,
                            "region":regionSelectedOption.value,
                            "province":provinceSelectedOption.value,
                            "city":document.getElementById("city").value,
                            "barangay":document.getElementById("barangay").value,
                            "street":document.getElementById("street").value,
                            "interest":idToName
                        });
                    
                        

                    while(dataCounter<data.length)
                    {
                        var table=document.getElementById("dataTable");
                        var join=data[dataCounter].interest.join("<br>");
                        var row=table.insertRow(dataCounter+1);
                        var cell1=row.insertCell(0);
                        var cell2=row.insertCell(1);
                        var cell3=row.insertCell(2);
                        var cell4=row.insertCell(3);
                        var cell5=row.insertCell(4);
                        var cell6=row.insertCell(5);
                        var cell7=row.insertCell(6);
                        var cell8=row.insertCell(7);
                        var cell9=row.insertCell(8);
                        var cell10=row.insertCell(9);
                        var cell11=row.insertCell(10);
                        var cell12=row.insertCell(11);

                        cell1.innerHTML=data[dataCounter].firstName;
                        cell2.innerHTML=data[dataCounter].lastName;
                        cell3.innerHTML=data[dataCounter].middleName;
                        cell4.innerHTML=data[dataCounter].birthDate;
                        cell5.innerHTML=data[dataCounter].gender;
                        cell6.innerHTML=data[dataCounter].region;
                        cell7.innerHTML=data[dataCounter].province;
                        cell8.innerHTML=data[dataCounter].city;
                        cell9.innerHTML=data[dataCounter].barangay;
                        cell10.innerHTML=data[dataCounter].street;
                        cell11.innerHTML=join;
                        cell12.innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                        '<button type="button" id="deleteBtn" onclick="deleteFunction(this)"><i class="fa fa-times"></i></button>';
                        
                        dataCounter++;  
                        clearInput();
                    }
                }
                else
                {
                    var gender=document.getElementsByName("gender");
                    for(var g = 0; g < gender.length; g++)
                    {
                        if(gender[g].checked)
                        {
                            var radioCheck = gender[g].value;
                        }
                    }

                    var interest=document.getElementsByName("interest");
                    for(var i = 0; i < interest.length; i++)
                    {
                        if(interest[i].checked)
                        {
                            Interests.push({
                            "interestId":interest[i].value
                        })
                    }
                    }

                    var itn=0;
                    var idToName=[];
                    var interestIdToName;
                    
                    for(itn=0; itn<Interests.length; itn++)
                    {
                        interestIdToName=Interests[itn].interestId;
                        interestIdToName-=1;
                        idToName.push(interestSourceArray[interestIdToName].interestName);
                    }
                    
                    data.splice(position, 1,
                        {
                            "firstName":document.getElementById("firstName").value,
                            "lastName":document.getElementById("lastName").value,
                            "middleName":document.getElementById("middleName").value,
                            "birthDate":document.getElementById("birthDate").value,
                            "gender":radioCheck,
                            "region":regionSelectedOption.value,
                            "province":provinceSelectedOption.value,
                            "city":document.getElementById("city").value,
                            "barangay":document.getElementById("barangay").value,
                            "street":document.getElementById("street").value,
                            "interest":idToName
                        });
                        
                        var table=document.getElementById("dataTable");
                        var join=data[position].interest.join("<br>");
                        table.rows[indexR].cells[0].innerHTML=data[position].firstName;
                        table.rows[indexR].cells[1].innerHTML=data[position].lastName;
                        table.rows[indexR].cells[2].innerHTML=data[position].middleName;
                        table.rows[indexR].cells[3].innerHTML=data[position].birthDate;
                        table.rows[indexR].cells[4].innerHTML=data[position].gender;
                        table.rows[indexR].cells[5].innerHTML=data[position].region;
                        table.rows[indexR].cells[6].innerHTML=data[position].province;
                        table.rows[indexR].cells[7].innerHTML=data[position].city;
                        table.rows[indexR].cells[8].innerHTML=data[position].barangay;
                        table.rows[indexR].cells[9].innerHTML=data[position].street;
                        table.rows[indexR].cells[10].innerHTML=join;
                        table.rows[indexR].cells[11].innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                                                '<button type="button" id="deleteBtn" onclick="deleteFunction(this)"><i class="fa fa-times"></i></button>';
                        editClickCounter=0;
                        clearInput();        
                }
            } 
        }   
        provinceClickCounter=1;
        regionClickCounter=0;         
    }

    function clearInput()
    {
        
        document.getElementById("firstName").value="";
        document.getElementById("lastName").value="";
        document.getElementById("middleName").value="";
        document.getElementById("birthDate").value="";
        document.getElementById("genderFemale").checked=false;
        document.getElementById("genderMale").checked=false;
        document.getElementById("province").innerHTML="";
        document.getElementById("region").innerHTML="";
        document.getElementById("city").value="";
        document.getElementById("barangay").value="";
        document.getElementById("street").value="";
        var interest=document.getElementsByName("interest");
        var i=0;
        while (i<interest.length)
        {
            interest[i].checked=false;
            i++;
        }
        Interests.splice(0, Interests.length)
    }

    function editFunction(w)
    {
        indexR=w.parentNode.parentNode.rowIndex;//starts with 2
        position=indexR-1;
        document.getElementById("province").innerHTML="";
        document.getElementById("region").innerHTML="";
        provinceClickCounter=1;
        regionClickCounter=0;
        var i=0;
        
        document.getElementById("firstName").value=data[position].firstName;
        document.getElementById("lastName").value=data[position].lastName;
        document.getElementById("middleName").value=data[position].middleName;
        document.getElementById("birthDate").value=data[position].birthDate;
        
        if ((data[position].gender)==("Female"))
        {
            document.getElementById("genderFemale").checked=true;
            document.getElementById("genderMale").checked=false;
        }
        else if ((data[position].gender)==("Male"))
        {
            document.getElementById("genderFemale").checked=false;
            document.getElementById("genderMale").checked=true;
        }

        var regionID;
        var regionSelect = document.getElementById("region");
        var dataRegion=data[position].region;

        for (var rr=0; rr<regionSourceArray.length; rr++)
        {
            if (dataRegion==regionSourceArray[rr].RegionName)
            {
                regionID=regionSourceArray[rr].RegionID;
            }
        }
        if(regionClickCounter==0){
            while (i<regionSourceArray.length)
            {
            regionSelect.options[regionSelect.options.length] = new Option(regionSourceArray[i].RegionName, regionSourceArray[i].RegionName);
            i++;
            }
        }
        
        var finalregionID=regionID-1;
        regionSelect.selectedIndex=finalregionID; 
        
        var provinceID;     
        var provinceSelect = document.getElementById("province");
        var dataProvince=data[position].province;

        for (var rp=0; rp<provinceSourceArray.length; rp++)
        {
            for(var s=0; s<provinceSourceArray[rp].length; s++)
            {
                if (dataProvince==provinceSourceArray[rp][s].provinceName)
                {
                    provinceID=s;
                }
            }
        }

        var regionIDp;
        var regionp=document.getElementById("region").value;

        if (provinceClickCounter==1)
        {
            for (var rpp=0; rpp<regionSourceArray.length; rpp++)
            {
                if (regionp==regionSourceArray[rpp].RegionName)
                {
                    regionIDp=regionSourceArray[rpp].RegionID;
                }
            }
        
            for (var r=0, check=false, p=0;check==false; r++)
            {
                if(regionIDp==provinceSourceArray[r][p].regionID)
                {
                    for(p=0; p<provinceSourceArray[r].length; p++)
                    {
                        provinceSelect.options[p] = new Option(provinceSourceArray[r][p].provinceName, provinceSourceArray[r][p].provinceName);    
                    }  
                    check=true; 
                } 
            } 
        }  
        provinceSelect.selectedIndex=provinceID;  

        document.getElementById("city").value=data[position].city;
        document.getElementById("barangay").value=data[position].barangay;
        document.getElementById("street").value=data[position].street;
        
        var q=0;
        var o=0;
        while(q<data[position].interest.length)
        {
            while (o<interestSourceArray.length)
            {
                if ((data[position].interest[q])==(interestSourceArray[o].interestName))
                {
                    document.getElementsByName("interest")[o].checked=true;
                    q++;
                }
                else
                {
                    document.getElementsByName("interest")[o].checked=false;
                }
                o++;  
            } 
        }
        editClickCounter=1;
    }

    function deleteFunction(w)
    {
        var table=document.getElementById("dataTable");
        indexR=w.parentNode.parentNode.rowIndex;
        data.splice(indexR-1,1);
        table.deleteRow(indexR);
        dataCounter--;
        editClickCounter=0;
        clearInput();    
    }

