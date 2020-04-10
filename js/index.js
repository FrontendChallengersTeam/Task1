/*
   Declaration and Definition Global Variables 
*/
var sitesList ;
var  Site_Name_input = document.getElementById("siteNameInput");
var  Site_Url_input = document.getElementById("siteUrlInput");


/*
   Check data in Local Storage
*/
if(localStorage.getItem("mySites") == null)
{
    sitesList = [];
}
else
{
    sitesList = JSON.parse( localStorage.getItem("mySites") );
    displaySites();
}



/*
    displaySites function  --> used to display data abouted the added sites 
*/
function displaySites() 
{
    var sitesSections = "";

    if(localStorage.getItem("mySites") == null)
    {
        sitesList = [];
    }
    else
    {
        sitesList = JSON.parse( localStorage.getItem("mySites") );

        for (var i = 0; i < sitesList.length; i++) 
        {
            sitesSections += '<div class="siteSection m-4">' +
                             '<h3 class="d-inline-block w_30 text-left px-3">' + sitesList[i].name + '</h3>' +
                             '<button class="btn btn-warning mx-2"><a href="'+ sitesList[i].url +'">Visit</a></button>' +
                             '<button class="btn btn-info mx-2" onclick="updateSite('+i+')">Update</button>' +
                             '<button class="btn btn-danger mx-2" onclick="deleteSite('+i+')">Delete</button>' +
                             '<div id="S'+i+'" class="pt-2"></div>' +
                             '</div >' ;
        }

        document.getElementById("addedSites").innerHTML = sitesSections;
    }

}


/*
    clearForm function  --> used to clear the input fields. 
*/
function clearForm() 
{
    Site_Name_input.value = "" ;
    Site_Url_input.value = "" ;
}


/*
    addSite function  --> used to add site to the bookmaker list. 
*/
function addSite()
{
    var site = 
    {
        name: Site_Name_input.value ,
        url: Site_Url_input.value  
    }

    var siteCheck = checkInList() ; 

    console.log(siteCheck) ;

    if(siteCheck == false)
    {
        sitesList.push(site); 

        localStorage.setItem("mySites", JSON.stringify(sitesList) );

        displaySites();
        clearForm();
    }
    else
    {
        /* site not added*/
    }
    
}


/*
    deleteSite function  --> used to delete the Bookmarker site. 
*/
function deleteSite (index)
{
    sitesList.splice(index,1);
    localStorage.setItem("mySites",JSON.stringify(sitesList)) ;
    displaySites();
}


/*
    updateSite function  --> used to determine specific Bookmarker site and show the fields to edit. 
*/
function updateSite (index)
{
    document.getElementById('S'+index).innerHTML = '<label class="my-3 ml-3">Site Name: </label>' +
                                                      '<input  id="S'+index+'NameInput" type="text"  value="'+sitesList[index].name +'"  placeholder="Bookmark Name" class="form-control d-inline-block w_30 ml-2">' +
                                                      '<label class="ml-4">Site URL: </label>' +
                                                      '<input id="S'+index+'UrlInput" type="email"  value="'+sitesList[index].url +'"  placeholder="website URL" class="form-control d-inline-block w_30 ml-2">' +
                                                      '<button class="btn btn-info p2- py-2 ml-3" onclick="startUpdate('+index+')">Update</button>' +
                                                      '<button class="btn btn-danger px- py-2 mx-2" onclick="cancelUpdate('+index+')">Cancel</button>' ;

    document.getElementById('S'+index).style =  "display: block" ;
}



/*
    startUpdate function  --> used to update Bookmarker site data. 
*/
function startUpdate(index)
{
    var site_name ;
    var site_url ;
    var site ;

    sitesList = JSON.parse( localStorage.getItem("mySites") );

    site_name = document.getElementById('S'+index+'NameInput').value ;
    site_url = document.getElementById('S'+ index+'UrlInput').value ;

    site = { name: site_name , url: site_url } ;


    var nonEmptyInput = nonEmptyInputCheck(site.name,site.url);

    if(nonEmptyInput == true)
    {
        var siteCheck = checkInList(site.name,site.url) ; 
        console.log(siteCheck) ;

        if(siteCheck == false)
        {
            sitesList[index] = site ; 

            localStorage.setItem("mySites", JSON.stringify(sitesList) );

            document.getElementById('S'+index).style =  "display: none" ;

            displaySites() ;
        }
        else
        {
            /* site not added*/
        }

    }
    else if(nonEmptyInput == false)
    {
        /* site not added as not complete adding the all required info*/
    }
}


/*
    cancelUpdate function  --> used to cancel the update request for Bookmarker site. 
*/
function cancelUpdate(index)
{
    document.getElementById('S'+index).style =  "display: none" ;
}


/*
    nonEmptyInputCheck function  --> used to check if the input fields have a input data or empty.
*/
function nonEmptyInputCheck(siteName,siteUrl)
{
    if( (siteName == "") || ( siteUrl == "") )
    {
        if( (siteName == "") && ( siteUrl == "") ) 
        { 
            window.alert("Please enter site name and site url."); 
        }
        else if(siteName == "")
        {
              window.alert("Please enter site name."); 
        }
        else if( siteUrl == "")
        { 
            window.alert("Please enter site url."); 
        }
        return false ;
    }
    else
    {
        return true ;
    }
}


/*
    displaySites function  --> used to display data aboute the added sites 
*/
function checkInList(siteName,siteUrl) 
{
    var enteredValue = {name: siteName, url: siteUrl } ;
    var existValue ;

    if(localStorage.getItem("mySites") == null)
    {
        sitesList = [];
        return false ;
    }
    else
    {
        sitesList = JSON.parse( localStorage.getItem("mySites") );

        for (var i = 0; i < sitesList.length; i++) 
        {
            existValue = sitesList[i] ;
            console.log(existValue);

            if( (existValue.name == enteredValue.name) || (existValue.url == enteredValue.url))
            {
                if( (existValue.name == enteredValue.name) && (existValue.url == enteredValue.url) )
                {
                    window.alert("Sorry, the entered site name and url are already entered before.");
                    return true;
                }
                else if((existValue.name == enteredValue.name))
                {
                    window.alert("Sorry, the entered site name is already entered before.");
                    return true;
                }
                else if((existValue.url == enteredValue.url))
                {
                    window.alert("Sorry, the entered site url is already entered before.");
                    return true;
                }
            }
            else
            {
                /* site did't added before.*/
            }
        }    
        return false ;
        
    }

}