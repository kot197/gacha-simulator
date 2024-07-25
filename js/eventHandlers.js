
import { warp, addWarpItem, insertWarpToTable, loadWarpRecord } from './core.js';
import { warpRecordObject, dataObject } from './script.js';

const StartWarpBtn = document.getElementById('start-btn');
const Video = document.getElementById('video');
const HeaderWrapper = document.getElementById('header-wrapper');
const Banners = document.getElementById('banners');

const LimitedBanner = document.getElementById('limited-banner');
const StandardBanner = document.getElementById('standard-banner');
const WarpWrapper = document.getElementById('warp-wrapper');

const Warp_1_Btn = document.getElementById('warp_x1');
const Warp_10_Btn = document.getElementById('warp_x10');

const PrevPageButton = document.getElementById('prev-page');
const NextPageButton = document.getElementById('next-page');

export function setupEventHandlers() {
    StartWarpBtn.addEventListener('click', () => {
        console.log('clicked start warp');
        Video.classList.toggle("hide");
        HeaderWrapper.style.display = "none";
    
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

    PrevPageButton.addEventListener('click', () => {
        warpRecordObject.skip -= warpRecordObject.limit;
        console.log(warpRecordObject.skip);
        loadWarpRecord();
    });

    NextPageButton.addEventListener('click', () => {
        warpRecordObject.skip += warpRecordObject.limit;
        console.log(warpRecordObject.skip)
        loadWarpRecord();
    });

    Warp_1_Btn.addEventListener('click', async () => {
        switch(warp()) {
            case "SSR":
                // 50/50
                if(Math.random() < 0.5) {
                    const findResult = dataObject.fireflyBannerData.data.find(item => item.entity_name === 'Firefly');
                    
                    insertWarpToTable(findResult);
                    addWarpItem(findResult);
                    console.log("Warp: Firefly");
                } else {
                    const findResult = dataObject.fireflyBannerData.data.filter(item => item.rarity === 3 && item.rate_up === 1);
                    
                    const randomIndex = Math.floor(Math.random() * findResult.length);
                    insertWarpToTable(findResult[randomIndex]);
                    addWarpItem(findResult[randomIndex]);
                    console.log("Warp: SSR");
                }
    
                break;
            case "SR":
                // 50/50
                if(Math.random() < 0.5) {
                    const findResult = dataObject.fireflyBannerData.data.filter(item => item.rarity === 2 && item.rate_up === 1);
                    
                    const randomIndex = Math.floor(Math.random() * findResult.length);
                    insertWarpToTable(findResult[randomIndex]);
                    addWarpItem(findResult[randomIndex]);
                } else {
                    const findResult = dataObject.fireflyBannerData.data.filter(item => item.rarity === 2 && item.rate_up === 0);
                    
                    const randomIndex = Math.floor(Math.random() * findResult.length);
                    insertWarpToTable(findResult[randomIndex]);
                    addWarpItem(findResult[randomIndex]);
                }
    
                break;
            case "R":
                const findResult = dataObject.fireflyBannerData.data.filter(item => item.rarity === 1);
                    
                const randomIndex = Math.floor(Math.random() * findResult.length);
                insertWarpToTable(findResult[randomIndex]);
                addWarpItem(findResult[randomIndex]);
    
                break;
            default:
        }
    });
}