var startX = 0;
var endX;

var slideArray = ['current', 'extra', 'wind', 'astro'];
var slideCtr = 0;

var ar = document.querySelector('.hiddenSlide');

ar.addEventListener('touchstart', function(ev){
    startX = ev.changedTouches[0].screenX;
});

ar.addEventListener('touchend', function(ev){
    endX = ev.changedTouches[0].screenX;
    detectSlide();
});

/* var ar = document.querySelectorAll('.slider-card');

ar.forEach(el => el.addEventListener('touchstart', function(ev){
    startX = ev.changedTouches[0].screenX;
}));

ar.forEach(el => el.addEventListener('touchend', function(ev){
    startX = ev.changedTouches[0].screenX;
    detectSlide();
})); */

function detectSlide(){
    console.log(startX, endX);
    if(startX > endX){
        console.log('Right');
        slide('right');
    }
    if(startX < endX){
        console.log("Left");
        slide('left');
    }
    else{
        console.log("=");
    }
}

function slide(direction){
    if(direction === 'left' && slideCtr > 0){
        --slideCtr;
        document.querySelector(`.slider-${slideArray[slideCtr]}`).scrollIntoView();      
    }
    if(direction === 'right' && slideCtr < 3){
        ++slideCtr;
        document.querySelector(`.slider-${slideArray[slideCtr]}`).scrollIntoView();
    }
    /* ar.scrollIntoView(); */
}