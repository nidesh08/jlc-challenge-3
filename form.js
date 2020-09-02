        var Interests=[
        
        ];
        var data=[{}]; 
        var r=0;
        var dataCounter=1;
        var editClickCounter=0;
        function selectRegion()
        {
            
            var regionSelect=document.getElementById("region");
            if (r==0)
            {
                for(r=0; r<regionSourceArray.length; r++)
                {
                    regionSelect.innerHTML+='<option value="'+regionSourceArray[r].RegionName+'">' + regionSourceArray[r].RegionName + '</option>';
                }
            }
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
                        if(gender[g].checked){
                            var radioCheck = gender[g].value;
                        }
                    }
    
                    var interest=document.getElementsByName("interest");
                    for(var i = 0; i < interest.length; i++)
                    {
                        if(interest[i].checked){
                        Interests.push({
                        "interestId":interest[i].value
                        })
                    }
                    }
    
                    var itn=0;
                    var idToName="";
                    var interestIdToName;
                    for(itn=0; itn<Interests.length; itn++)
                    {
                        interestIdToName=Interests[itn].interestId;
                        interestIdToName-=1;
                        idToName+=interestSourceArray[interestIdToName].interestName+'<br>';
                    }
                    
                    data.splice(dataCounter, data.length,
                        {
                            "firstName":document.getElementById("firstName").value,
                            "lastName":document.getElementById("lastName").value,
                            "middleName":document.getElementById("middleName").value,
                            "birthDate":document.getElementById("birthDate").value,
                            "gender":radioCheck,
                            "region":document.getElementById("region").value,
                            "province":document.getElementById("province").value,
                            "city":document.getElementById("city").value,
                            "barangay":document.getElementById("barangay").value,
                            "street":document.getElementById("street").value,
                            "interest":idToName
                        });
                    
                    clearInput();
    
                    while(dataCounter<data.length)
                    {
                        var table=document.getElementById("dataTable");
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
                        cell11.innerHTML=data[dataCounter].interest;
                        cell12.innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                         '<button type="button" id="deleteBtn" onclick="deleteFunction(this)"><i class="fa fa-times"></i></button>';
                        
                        dataCounter++;
                    }
    
                }
                else
                {
                    var gender=document.getElementsByName("gender");
                    for(var g = 0; g < gender.length; g++)
                    {
                        if(gender[g].checked){
                            var radioCheck = gender[g].value;
                        }
                    }
    
                    var interest=document.getElementsByName("interest");
                    for(var i = 0; i < interest.length; i++)
                    {
                        if(interest[i].checked){
                        Interests.push({
                        "interestId":interest[i].value
                        })
                    }
                    }
    
                    var itn=0;
                    var idToName="";
                    var interestIdToName;
                    for(itn=0; itn<Interests.length; itn++)
                    {
                        interestIdToName=Interests[itn].interestId;
                        interestIdToName-=1;
                        idToName+=interestSourceArray[interestIdToName].interestName+'<br>';
                    }
                    
                    data.splice(position, 1,
                        {
                            "firstName":document.getElementById("firstName").value,
                            "lastName":document.getElementById("lastName").value,
                            "middleName":document.getElementById("middleName").value,
                            "birthDate":document.getElementById("birthDate").value,
                            "gender":radioCheck,
                            "region":document.getElementById("region").value,
                            "province":document.getElementById("province").value,
                            "city":document.getElementById("city").value,
                            "barangay":document.getElementById("barangay").value,
                            "street":document.getElementById("street").value,
                            "interest":idToName
                        });
                        clearInput();

                        var table=document.getElementById("dataTable");
                        table.rows[position].cells[0].innerHTML=data[position].firstName;
                        table.rows[position].cells[1].innerHTML=data[position].lastName;
                        table.rows[position].cells[2].innerHTML=data[position].middleName;
                        table.rows[position].cells[3].innerHTML=data[position].birthDate;
                        table.rows[position].cells[4].innerHTML=data[position].gender;
                        table.rows[position].cells[5].innerHTML=data[position].region;
                        table.rows[position].cells[6].innerHTML=data[position].province;
                        table.rows[position].cells[7].innerHTML=data[position].city;
                        table.rows[position].cells[8].innerHTML=data[position].barangay;
                        table.rows[position].cells[9].innerHTML=data[position].street;
                        table.rows[position].cells[10].innerHTML=data[position].interest;
                        table.rows[position].cells[11].innerHTML='<button type="button" id="editBtn" onclick="editFunction(this)"><i class="fa fa-pencil-square-o"></i></button>'+' '+
                                                                '<button type="button" id="deleteBtn" onclick="deleteFunction(this)"><i class="fa fa-times"></i></button>';
                        
        

                        editClickCounter=0;
                }
            }         
        }

        function clearInput()
    {
        document.getElementById("firstName").value="";
        document.getElementById("lastName").value="";
        document.getElementById("middleName").value="";
        document.getElementById("birthDate").value="";
        document.getElementById("genderFemale").checked=false;
        document.getElementById("genderMale").checked=false;
        document.getElementById("region").value="";
        document.getElementById("province").value="";
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
        indexR=w.parentNode.parentNode.rowIndex;
        document.getElementById("firstName").value=data[indexR-1].firstName;
        document.getElementById("lastName").value=data[indexR-1].lastName;
        document.getElementById("middleName").value=data[indexR-1].middleName;
        document.getElementById("birthDate").value=data[indexR-1].birthDate;
        //document.getElementById("gender").value=data[indexR].gender;
        document.getElementById("region").value=data[indexR-1].region;
        document.getElementById("province").value=data[indexR-1].province;
        document.getElementById("city").value=data[indexR-1].city;
        document.getElementById("barangay").value=data[indexR-1].barangay;
        document.getElementById("street").value=data[indexR-1].street;
//show picked gender and interest on the form
//how to integrate this into form huhu
        editClickCounter=1;
        position=indexR;
    }
    function deleteFunction(w)
    {
        var table=document.getElementById("dataTable");
        indexR=w.parentNode.parentNode.rowIndex;
        data.splice(indexR,1);
        table.deleteRow(indexR);
        dataCounter--;
        clearInput();
    }
