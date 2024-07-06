const StartWarpBtn = document.getElementById('start-btn');
const Video = document.getElementById('video');
const HeaderWrapper = document.getElementById('header-wrapper');
const Banners = document.getElementById('banners');

const LeftGradient = document.getElementById('left-gradient');
const RightGradient = document.getElementById('right-gradient');

StartWarpBtn.addEventListener('click', () => {
    Video.classList.toggle("hide");
    HeaderWrapper.style.display = "none";

    console.log("asdasd");

    Banners.classList.toggle("hide");

    //LeftGradient.classList.toggle("no-hover");
    //RightGradient.classList.toggle("no-hover");
});



console.log("Hello world!");