"use strict"
//save hiddent chapter block
//chapter
let chapter = document.querySelector('.chapter')
let chapterClose = document.querySelector('.chapter__close')
if(document.querySelectorAll('.chapter').length) {
  chapter.classList.add('active')
  chapterClose.onclick = function() {
    chapter.classList.add('hidden')
    localStorage.setItem('chapter', 'hidden');
  }
  if(localStorage.getItem('chapter') == 'hidden') {
    chapter.classList.add('hidden')
  } else {
    chapter.classList.remove('hidden')
  }
}


window.onload = function() {
    function changerActive(list) {
        for(let i = 0; i < list.length; i++) {
            list[i].classList.remove('active')
        }
        list = 0
    }
    // scroll document false
    
    function is_touch_device() {
        return ('ontouchstart' in window);
      }
      
      function bodyFixed() { //scroll - false
        if(is_touch_device()) {
          document.body.classList.add('fixed')
        } else {
          let x=window.scrollX;
          let y=window.scrollY;
          window.onscroll=function(){window.scrollTo(x, y);};
        }
      }
      
      function bodyNotFixed() { // scroll - true
        if(is_touch_device()) {
          document.body.classList.remove('fixed')
        } else {
          window.onscroll=function(){window.scrollTo()};
      
        }
      }
    
      
    //preview swiper
    if(document.querySelectorAll('.preview-swiper').length) {
        const swiper = new Swiper('.preview-swiper', {
            slidesPerView: 1,
            loop: true,
            autoplay: {
              delay: 10000,
            },
        })
    }
    
    //nav
    let navItemAdd = document.querySelectorAll('.header__nav-item')
    let headerAdditional = document.querySelectorAll('.header__additional')

    for(let i=0 ; i < navItemAdd.length ; i++) {
        navItemAdd[i].addEventListener("mousemove",
        function() {
            changerActive(headerAdditional)
            if(headerAdditional[i].innerHTML != '')
              headerAdditional[i].classList.add('active')
        })
    }

    for(let i=0 ; i < headerAdditional.length ; i++) {
        headerAdditional[i].addEventListener("mouseleave",
        function() {
            changerActive(headerAdditional)
        })
    }

    document.addEventListener("mouseover",
    function(event) {
      if(event.target.classList.contains("header__nav-item ")) {
        console.log('nice')
      }
    })

    //nav mob
    let navItemMob = document.querySelectorAll('.header-m__nav-item')
    for(let i=0 ; i < navItemMob.length ; i++) {
      navItemMob[i].addEventListener("click",
      function() {
        let headerMomAdditional = navItemMob[i].nextElementSibling
        if(headerMomAdditional.classList.contains('header-m__additional')) {
        console.log(navItemMob[i].nextElementSibling)
          $(headerMomAdditional).slideToggle(1000);
        }
      })
  }

    let nav_icon = document.querySelector('#nav-icon')
    let header = document.querySelector('.header')
    //header
    document.querySelector('.header__menu').onclick = function() {
      document.querySelector('.header__menu').classList.toggle('active')
      $('.header-m').slideToggle(1000);
      nav_icon.classList.toggle('open')
      if(nav_icon.classList.contains('open')) {
        header.classList.add('active')
        bodyFixed()
      } else {
        header.classList.remove('active')
        bodyNotFixed()
      }
    }
    // Size-control
    window.addEventListener('resize', function(event){
      if(window.innerWidth > 1023) {
        document.querySelector('.header__menu').classList.remove('active')
        document.querySelector('.header-m').classList.remove('active')
        nav_icon.classList.remove('open')
        $('.header-m').slideUp(200);
        bodyNotFixed()
      }
    })

    // animation
    const animItems = document.querySelectorAll('.anim-items')

    if(animItems.length > 0) {
      window.addEventListener('scroll', animOnScroll);
      function animOnScroll() {
        for (let index = 0; index <animItems.length; index++) {
          const animItem = animItems[index];
          const animItemHeight = animItem.offsetHeight;
          const animItemOffset = offset(animItem).top;
          const animStart = 10;

          let animItemPoint = window.innerHeight - animItemHeight / animStart;
          if(animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
          }

          if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('active');
          } else {
            if(!animItem.classList.contains('anim-no-hide')) {
              animItem.classList.remove('active')
            }
          }
        }
      }
      function offset(el) {
        const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTol;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
      }
      animOnScroll()
    }
};
//survey
if(document.querySelectorAll('.survey').length) {
  let survey = document.querySelector('.survey')
  let quiz = document.querySelector('.quiz')
  survey.onclick = function() {
    $('body,html').animate({
      scrollTop: $(quiz).offset().top - 150
    },1000);
    openQuiz()
  }
}


//quiz
if(document.querySelectorAll('.quiz__title').length) {
  let quizBtn = document.querySelector('.quiz__title')
  quizBtn.onclick = function() {
    openQuiz()
  }
}
function openQuiz() {
  let quizBtn = document.querySelector('.quiz__title')
  let quiz = document.querySelector('.quiz__content')
  quizBtn.classList.add('active')
  $(quiz).slideDown({
    start: function () {
      $(this).css({
        display: "flex"
      })
    }
  })
}