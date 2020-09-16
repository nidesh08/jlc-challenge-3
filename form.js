    var Interests=[];
    var data=[{}]; 
    var dataCounter=1;
    var editClickCounter=0;
    var regionID;
    var provinceClickCounter=0;
    var regionClickCounter=0;
    var cityClickCounter=0;
    var barangayClickCounter=0;
    var position;

    function selectRegion()
    {
        var regionCounter=0;
        var regionSelect = document.getElementById("region");
    
            if(regionClickCounter==0)
            {
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

    function selectProvince()
    {
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
                    //new Option(text,value)
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
        var provinceID;
        var provinceValue=document.getElementById("province").value;
        var citySelect = document.getElementById("city");
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

            while (cityCounter<citySourceArray.length)
            {
                if (provinceID==citySourceArray[cityCounter].provinceID)
                {
                    citySelect.options[citySelect.options.length] = new Option(citySourceArray[cityCounter].cityName, citySourceArray[cityCounter].cityName);    
                }
                cityCounter++;
            }
        }
        cityClickCounter=0;
        barangayClickCounter=1;
        document.getElementById("barangay").innerHTML="";
    }

    function selectBarangay()
    {
        var cityID;
        var cityValue=document.getElementById("city").value;
        var barangaySelect = document.getElementById("barangay");
        var barangayCounter=0;

        if (barangayClickCounter==1)
        {
            barangaySelect.innerHTML="";
            for (var cb=0; cb<citySourceArray.length; cb++)
            {
                if (cityValue==citySourceArray[cb].cityName)
                {
                    cityID=citySourceArray[cb].cityID;
                }
            }

            while (barangayCounter<barangaySourceArray.length)
            {
                if (cityID==barangaySourceArray[barangayCounter].cityID)
                {
                    barangaySelect.options[barangaySelect.options.length] = new Option(barangaySourceArray[barangayCounter].barangayName, barangaySourceArray[barangayCounter].barangayName);    
                }
                barangayCounter++;
            }
        }
        barangayClickCounter=0;
    }

    function interestFunction()
    {
        var interestList=document.getElementById("interestDisplay");
        for (x=0; x<interestSourceArray.length; x++)
        { 
            if (x==0)
            {
                interestList.innerHTML+='<input type="checkbox" id="'+interestSourceArray[x].interestId+'" name="interest" value="'+interestSourceArray[x].interestId+'">' +
                '<label for="'+interestSourceArray[x].interestId+'">' + '&nbsp&nbsp'+interestSourceArray[x].interestName +'<label>';
            }
            else
            {
                interestList.innerHTML+='<br>'+'<input type="checkbox" id="'+interestSourceArray[x].interestId+'" name="interest" value="'+interestSourceArray[x].interestId+'">' +
                '<label for="'+interestSourceArray[x].interestId+'">' + '&nbsp&nbsp'+interestSourceArray[x].interestName +'<label>';
            }
           
        }
    }

    function submitForm()
    {
        var pattern = /[0-9]/g;
        var test = pattern.test(document.getElementById("firstName").value);
        var test1= pattern.test(document.getElementById("lastName").value);
        var test2= pattern.test(document.getElementById("middleName").value);
        
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
                            "region":document.getElementById("region").value,
                            "regionIndex":document.getElementById("region").selectedIndex,
                            "province":document.getElementById("province").value,
                            "provinceIndex":document.getElementById("province").selectedIndex,
                            "city":document.getElementById("city").value,
                            "cityIndex":document.getElementById("city").selectedIndex,
                            "barangay":document.getElementById("barangay").value,
                            "barangayIndex":document.getElementById("barangay").selectedIndex,
                            "street":document.getElementById("street").value,
                            "interest":idToName
                        });
                    
                        

                    while(dataCounter<data.length)
                    {
                        var table=document.getElementById("dataTable");
                        var join=data[dataCounter].interest.join("<br>");
                        var row=table.insertRow(dataCounter);
                        //row.setAttribute('id', 'dataCounter');
                        
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

                        cell1.setAttribute('onclick', 'dataModal(this)');
                        cell2.setAttribute('onclick', 'dataModal(this)');
                        cell3.setAttribute('onclick', 'dataModal(this)');
                        cell4.setAttribute('onclick', 'dataModal(this)');
                        cell5.setAttribute('onclick', 'dataModal(this)');
                        cell6.setAttribute('onclick', 'dataModal(this)');
                        cell7.setAttribute('onclick', 'dataModal(this)');
                        cell8.setAttribute('onclick', 'dataModal(this)');
                        cell9.setAttribute('onclick', 'dataModal(this)');
                        cell10.setAttribute('onclick', 'dataModal(this)');
                        cell11.setAttribute('onclick', 'dataModal(this)');

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
                        cell12.innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)" class="btn btn-warning"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                        '<button type="button" id="deleteBtn" onclick="deleteFunction(this)" class="btn btn-danger"><i class="fa fa-times"></i></button>';
                        
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
                            "region":document.getElementById("region").value,
                            "regionIndex":document.getElementById("region").selectedIndex,
                            "province":document.getElementById("province").value,
                            "provinceIndex":document.getElementById("province").selectedIndex,
                            "city":document.getElementById("city").value,
                            "cityIndex":document.getElementById("city").selectedIndex,
                            "barangay":document.getElementById("barangay").value,
                            "barangayIndex":document.getElementById("barangay").selectedIndex,
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
                        table.rows[indexR].cells[11].innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)" class="btn btn-warning"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                                                '<button type="button" id="deleteBtn" onclick="deleteFunction(this)" class="btn btn-danger"><i class="fa fa-times"></i></button>';
                        editClickCounter=0;
                        clearInput();        
                }
                $("#formModal").modal("hide");
            } 
           //   
        }   
        regionClickCounter=0;
        provinceClickCounter=1;
        cityClickCounter=1;
        barangayClickCounter=1;
          
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
        document.getElementById("city").innerHTML="";
        document.getElementById("barangay").innerHTML="";
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
        position=indexR;
        document.getElementById("province").innerHTML="";
        document.getElementById("region").innerHTML="";
        document.getElementById("city").innerHTML="";
        document.getElementById("barangay").innerHTML="";
        document.getElementById("modalTitle").innerHTML="Edit Data";
        regionClickCounter=0;
        provinceClickCounter=1;
        cityClickCounter=1;
        barangayClickCounter=1;
        
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

        var regionSelect = document.getElementById("region");
        selectRegion();
        regionSelect.selectedIndex=data[position].regionIndex;   

        var provinceSelect = document.getElementById("province");
        selectProvince();
        provinceSelect.selectedIndex=data[position].provinceIndex;

        var citySelect = document.getElementById("city");
        selectCity();
        citySelect.selectedIndex=data[position].cityIndex;   

        var barangaySelect = document.getElementById("barangay");
        selectBarangay();
        barangaySelect.selectedIndex=data[position].barangayIndex;

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
        $("#formModal").modal("show");

    }

    function deleteFunction(w)
    {
        var table=document.getElementById("dataTable");
        indexR=w.parentNode.parentNode.rowIndex;
        data.splice(indexR,1);
        table.deleteRow(indexR);
        dataCounter--;
        editClickCounter=0;
        clearInput();
        regionClickCounter=0;
        provinceClickCounter=1;
        cityClickCounter=1;
        barangayClickCounter=1;  
    }  
 
    function dataModal(w)
    {
        position=w.parentNode.rowIndex;
        var join=data[position].interest.join("<br>");
        
        document.getElementById("modalFirstName").innerHTML=data[position].firstName;
        document.getElementById("modalLastName").innerHTML=data[position].lastName;
        document.getElementById("modalMiddleName").innerHTML=data[position].middleName;
        document.getElementById("modalBirthDate").innerHTML=data[position].birthDate;
        document.getElementById("modalGender").innerHTML=data[position].gender;
        document.getElementById("modalRegion").innerHTML=data[position].region;
        document.getElementById("modalProvince").innerHTML=data[position].province;
        document.getElementById("modalCity").innerHTML=data[position].city;
        document.getElementById("modalBarangay").innerHTML=data[position].barangay;
        document.getElementById("modalStreet").innerHTML=data[position].street;
        document.getElementById("modalInterest").innerHTML=join;

        $("#dataModal").modal("show"); 
    }

    function formModal()
    {
        clearInput();
        document.getElementById("modalTitle").innerHTML="Create New Data";
        $("#formModal").modal("show");
        editClickCounter=0;
        regionClickCounter=0;
        provinceClickCounter=1;
        cityClickCounter=1;
        barangayClickCounter=1;
    }