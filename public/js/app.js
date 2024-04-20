

var swiper = new Swiper(".home-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay:2500,
        disableOnInteraction: false,
    }
  });
var swiper = new Swiper(".venue-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay:2500,
        disableOnInteraction: false,
    }
  });


  var menuBtn = document.querySelector("#menu-bar");
var navBar = document.querySelector(".navbar");
menuBtn.onclick = ()=>{
    menuBtn.classList.toggle("fa-times");
    navBar.classList.toggle("active");
};

window.onscroll = ()=>{
    menuBtn.classList.remove("fa-times");
    navBar.classList.remove("active");
    
}