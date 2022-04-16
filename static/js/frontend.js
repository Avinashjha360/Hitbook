
let delete_button_box = document.querySelector('#delete-button > a');
delete_button_box.style.display='none';

function clickDeleteButton()
{
    if(delete_button_box.style.display != 'inline')
        delete_button_box.style.display='inline';
    else
        delete_button_box.style.display='none';  
}


let user_profile_box = document.querySelector('#profile-box');

function clickUserProfile()
{
  alert("clicked");
    if(user_profile_box.style.display != 'inline')
    user_profile_box.style.display='inline';
    else
    user_profile_box.style.display='none';  
}

 
   