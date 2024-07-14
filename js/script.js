const StartWarpBtn = document.getElementById('start-btn');
const Video = document.getElementById('video');
const HeaderWrapper = document.getElementById('header-wrapper');
const Banners = document.getElementById('banners');

const LimitedBanner = document.getElementById('limited-banner');
const StandardBanner = document.getElementById('standard-banner');
const WarpWrapper = document.getElementById('warp-wrapper');

const UIDText = document.getElementById('uid');

const Warp_1_Btn = document.getElementById('warp_x1');
const Warp_10_Btn = document.getElementById('warp_x10');

const fireflyBannerIndex = [25, 35, 50, 29, 36, 30, 49, 33, // SSR Characters
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21, // SR Characters
    51,67,70,73,80,87,88,95,98,100,102,111,116,118,119,122,127,133,134,136,138,144,145,52,55,57,65,66,68,71,72,74,83,90,99,101,103,105,106,112,117,125,128,146 // Light Cones
];

let fireflyBannerArrSSR = [];

// Check if there is support for local storage
if (typeof(Storage) !== "undefined") {
    let uid;
    uid = localStorage.getItem("uid");

    // Check if uid exists in local storage
    if(isEmpty(uid)) {
        // Store
        localStorage.setItem("uid", crypto.randomUUID());
        uid = localStorage.getItem("uid");

        // Body data to be send in POST request
        let body_data = {
            user_uid: uid
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(body_data) // Convert the data object to a JSON string
        };

        fetch('http://localhost/gacha-simulator/api/user/create.php', options)
                .then(response => {
                        if(!response.ok) {
                            throw new Error("Network response was not ok " + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch(error => {
                        console.error("There was a problem with the fetch operation:", error);
                    });
    }

    // Retrieve
    UIDText.innerHTML = uid;
} else {
    // Sorry! No Web Storage support..
}

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

Warp_1_Btn.addEventListener('click', () => {
    if(fireflyBannerArrSSR.length === 0) {
        fireflyBannerSSRIndex.forEach((index) => {
            fetch('http://localhost/gacha-simulator/api/entity/read_single.php?id=${index}')
                .then(response => {
                    if(!response.ok) {
                        throw new Error("Network response was not ok " + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    fireflyBannerArrSSR.push(data);
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
        });
    }

    if(warp() == "SSR") {
        if(Math.random() < 0.5) {
            
        } else {

        }
    }
});

function warp() {
    const randomNum = Math.random();
    
    if (randomNum < 0.006) {
        return "SSR";
    }

    if (randomNum < 0.057) {
        return "SR";
    }

    return "None";
}

function isEmpty(value) {
    return (
      value === undefined || 
      value === null || 
      value === "" || 
      (Array.isArray(value) && value.length === 0) || 
      (typeof value === "object" && Object.keys(value).length === 0)
    );
}

console.log("Hello world!");

