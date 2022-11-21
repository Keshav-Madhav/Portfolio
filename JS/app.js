
const filter_btns=document.querySelectorAll(".filter-btn")
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap= document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");


const hamburger_menu=document.querySelector(".hamburger-menu");
const navbar=document.querySelector("header nav");
const links =document.querySelectorAll(".links a");
hamburger_menu.addEventListener("click", () =>{
    if(!navbar.classList.contains("open")){
        navbar.classList.add("open");
        document.body.classList.add("stop-scrolling");
    }
    else{
        closeMenu();
    }
})

function closeMenu(){
    navbar.classList.remove("open")
    document.body.classList.remove("stop-scrolling");
}

links.forEach((link) => link.addEventListener("click", () => closeMenu()));



filter_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filter_btns.forEach( button => button.classList.remove("active"));
        btn.classList.add('active');

        let filterValue=btn.dataset.filter;
        $('.grid').isotope({filter: filterValue});
    });
});

$('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    transitionDuration: "0.6s",
});

window.addEventListener("scroll", ()=>{
    skillsEffect();
    countUp();
})

function checkScroll(el){
    let rect= el.getBoundingClientRect();
    if(window.innerHeight >= rect.top + el.offsetHeight) return true;
    return false;
}

function skillsEffect(){
    if(!checkScroll(skills_wrap)){
        skills_bars.forEach(skill => (skill.style.width = 0));
    }
    else{
        skills_bars.forEach(skill => (skill.style.width = skill.dataset.progress));
    }
}

function countUp(){
    if(!checkScroll(records_wrap)) return;
    records_numbers.forEach((numb) => {
        const updateCount = () =>{
            let currentNum= +numb.innerText;
            let maxNum= +numb.dataset.num;
            const increment = Math.ceil(maxNum/1000);
            if(currentNum<maxNum){
                numb.innerText=currentNum+increment;
                setTimeout(updateCount,30);
            }
            else{
                numb.innerText=maxNum;
            }
        };
        setTimeout(updateCount,500);
    })
}

let scrollerId;
let paused=true;
const scroll_btn=document.querySelector(".scroll");

function startScroll(){
    let id = setInterval(function(){
        window.scrollBy(0,10);
        if(window.innerHeight + window.screenY==document.body.offsetHeight){
            stopScroll();
            paused=true;
        }
    }, 20);
    return id
}

function stopScroll(){
    clearInterval(scrollerId)
}

scroll_btn.addEventListener("click", function(event){
    if (paused==true){
        scrollerId=startScroll();
        paused=false;
    }
    else{
        stopScroll();
        paused=true
    }
})

// let scrollerId;
// const scroll_btn=document.querySelector(".scroll");

// function startScroll(){
//     scrollerId = setInterval(function(){
//         window.scrollBy(0,10);
//         if(window.innerHeight + window.screenY==document.innerHeight){
//             stopScroll();
//         }   
//     }, 20);
// }
// function stopScroll(){
//     clearInterval(scrollerId);
// }

// scroll_btn.addEventListener("mouseenter", function(){
//     startScroll();
// })

// scroll_btn.addEventListener("mouseout",function(){
//     stopScroll();
// })

let toggle = document.getElementById("mode");
toggle.addEventListener("click",()=>{
    document.body.classList.toggle("Dark")
})


