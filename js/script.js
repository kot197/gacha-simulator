const StartWarpBtn = document.getElementById('start-btn');
const Video = document.getElementById('video');
const HeaderWrapper = document.getElementById('header-wrapper');
const Banners = document.getElementById('banners');

const LimitedBanner = document.getElementById('limited-banner');
const StandardBanner = document.getElementById('standard-banner');
const WarpWrapper = document.getElementById('warp-wrapper');

StartWarpBtn.addEventListener('click', () => {
    Video.classList.toggle("hide");
    HeaderWrapper.style.display = "none";

    console.log("asdasd");

    Banners.classList.toggle("hide");
    LimitedBanner.parentElement.style.animation = "fade-up 0.5s";
    StandardBanner.parentElement.style.animation = "fade-up 0.5s";
});


LimitedBanner.addEventListener('click', () => {
    LimitedBanner.parentElement.style.zIndex = 45
    WarpWrapper.classList.toggle("on-right");
    LimitedBanner.classList.toggle("limited-banner-selected");

    if(WarpWrapper.classList.contains('on-right')) {
        WarpWrapper.style.animation = "move-right 1s";
        StandardBanner.parentElement.style.zIndex = 40;
    } else {
        WarpWrapper.style.animation = "pull-back-left 1s";
    }
});

StandardBanner.addEventListener('click', () => {
    StandardBanner.parentElement.style.zIndex = 45
    WarpWrapper.classList.toggle("on-left");
    StandardBanner.classList.toggle("standard-banner-selected");

    if(WarpWrapper.classList.contains('on-left')) {
        WarpWrapper.style.animation = "move-left 1s";
        LimitedBanner.parentElement.style.zIndex = 40;
    } else {
        WarpWrapper.style.animation = "pull-back-right 1s";
    }
});

console.log("Hello world!");