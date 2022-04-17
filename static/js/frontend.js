



function clickDeleteButton()
{
    let delete_button_box = document.querySelector('#delete-button > a');
    if(delete_button_box.style.display != 'inline')
        delete_button_box.style.display='inline';
    else
        delete_button_box.style.display='none';  
}


  
function clickUserProfile()
{
    var user_profile_box = document.querySelector('#profile-box');
    console.log("clicked");
    if(user_profile_box.style.display != 'inline')
    user_profile_box.style.display='inline';
    else
    user_profile_box.style.display='none';  
}

 
   