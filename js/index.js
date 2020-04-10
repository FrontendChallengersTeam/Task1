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