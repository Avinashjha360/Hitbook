let menu = document.getElementById('menu');
let menubar=document.getElementById('menubar');


console.log(bc)
function click1()
{
    document.getElementById('middle_box1').style.color='red';
    location.href='https://www.google.com';
}
function color_change(){

    let bc=document.getElementById('bc').value;
    document.querySelector('body').style.backgroundColor=bc;
    
    if (bc=='white'||bc=='White') {
        document.getElementById('webname').style.color='black';
        menu.style.backgroundColor='black';
        document.getElementById('home').style.color='black';
        document.getElementById('middle2').style.color='black';

        document.querySelectorAll('a')[0].style.color='black';
        document.querySelectorAll('a')[1].style.color='black';
        document.querySelectorAll('a')[2].style.color='black';
        document.querySelectorAll('a')[2].style.borderColor='black';
        document.querySelectorAll('a')[3].style.color='black';
        document.querySelectorAll('a')[4].style.color='black';
        document.querySelectorAll('a')[5].style.color='black';
        document.querySelectorAll('a')[6].style.color='black';
        document.querySelectorAll('a')[6].style.borderColor='black';
        
    }
    else if(bc=='tomato'||bc=='red')
    {   document.getElementById('webname').style.color='white';
        document.querySelectorAll('.tomato')[0].style.color='green';
        document.querySelectorAll('.tomato')[2].style.color='blue';
        document.querySelectorAll('.tomato')[3].style.color='blue';
        document.querySelectorAll('.tomato')[4].style.color='blue';
        document.querySelectorAll('.tomato')[5].style.color='blue';
    }
    else{
        document.getElementById('home').style.color='white';
        document.getElementById('middle2').style.color='white';
        menu.style.backgroundColor='unset';
        document.querySelectorAll('a')[0].style.color='white';
        document.querySelectorAll('a')[1].style.color='white';
        document.querySelectorAll('a')[2].style.color='white';
        document.querySelectorAll('a')[3].style.color='white';
        document.querySelectorAll('a')[3].style.borderColor='white';
        document.querySelectorAll('a')[4].style.color='white';
        document.querySelectorAll('a')[5].style.color='white';
        document.querySelectorAll('a')[6].style.color='white';
        document.querySelectorAll('a')[6].style.color='white';
        document.querySelectorAll('a')[6].style.borderColor='white';
        document.querySelectorAll('.tomato')[0].style.color='tomato';
        document.querySelectorAll('.tomato')[2].style.color='tomato';
        document.querySelectorAll('.tomato')[3].style.color='tomato';
        document.querySelectorAll('.tomato')[4].style.color='tomato';
        document.querySelectorAll('.tomato')[5].style.color='tomato';
    }

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