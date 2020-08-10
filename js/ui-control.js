var set = 0;

    var setBtn = document.querySelector('.settings');
    setBtn.addEventListener('click', settings);
    var unitbtn = document.querySelector('.unit-toggle-btn');
    unitbtn.addEventListener('click',function(){
        if(unitbtn.innerHTML === 'toggle_off'){
            localStorage.setItem('PWUnit', 'imp');
            unitbtn.innerHTML = 'toggle_on';
            imperial();
        }
        else if(unitbtn.innerHTML === 'toggle_on'){
            localStorage.setItem('PWUnit', 'met');
            unitbtn.innerHTML = 'toggle_off';
            metric();
        }
    });

    var setCloseBtn = document.querySelector('.closebtn');
    setCloseBtn.addEventListener('click', settings);

    function settings(){
        if(set === 0){
            document.querySelector('.unitContainer').style.display = "flex";
            setBtn.style.transform = "rotate(180deg)";
            set = 1;
        }
        else if(set === 1){
            document.querySelector('.unitContainer').style.display = "none";
            setBtn.style.transform = "rotate(-180deg)";
            set = 0;
        }
    }

    var searchBtn = document.querySelector('.searchBtn');
    var searchText = document.querySelector('.searchText');
    searchBtn.addEventListener('click', function(){
        fetchData(searchText.value);
    });

    searchText.addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            searchText.blur();
            searchBtn.click();
        }
    });

    function animateMain(){
        /* document.querySelector('main').style.animationName = "none"; */
        /* document.querySelector('main').style.animationName = "animMain";

        setTimeout(function(){
            document.querySelector('main').style.animationName = "none";
        }, 1400); */
        document.querySelector('main').style.animationName = "animMain";

        setTimeout(function(){
            document.querySelector('main').style.animationName = "none";
        }, 2100);
    }