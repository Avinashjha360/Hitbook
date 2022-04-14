let menu = document.getElementById('menu');
let menubar=document.getElementById('menubar');

let delete_button = document.getElementById('delete-button');
function clickDeleteButton()
{
    delete_button.style.color="black";
    UserDetail.find({}, function (err, foundUserDetails) {
        console.log(foundUserDetails);
    });
    
}
function click1()
{
    document.getElementById('middle_box1').style.color='red';
    location.href='https://www.google.com';
}


    
    // function menuchange() {

    //     if (menu.innerHTML!="close") {
    //         menubar.style.display='flex';
    //         menu.innerHTML="close"; 
                       
    //     }
    //     else {
    //         menu.innerHTML="menu";
    //         menubar.style.display='none';
            
    //     }
        
    // }



var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activeslide", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}