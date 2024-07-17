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

const WarpItemsWrapper = document.getElementById('warp-items-wrapper');

let fireflyBannerData;
let warpRecords;

let basePath = 'C:\\xampp\\htdocs\\gacha-simulator\\';
let uid;

// Check if there is support for local storage
if (typeof(Storage) !== "undefined") {
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

if(isEmpty(fireflyBannerData)) {
    fetch('http://localhost/gacha-simulator/api/entity/read_banner.php?banner_name=Firefly%20Banner')
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            fireflyBannerData = data;
            console.log(fireflyBannerData);

            if(isEmpty(warpRecords)) {
                fetch('http://localhost/gacha-simulator/api/warp/read.php')
                    .then(response => {
                        if(!response.ok) {
                            throw new Error("Network response was not ok " + response.statusText);
                        }
                        console.log(response);
                        return response.json();
                    })
                    .then(data => {
                        warpRecords = data;
                        console.log(warpRecords);
                        warpRecords.data.forEach(warp => {
                            const findResult = fireflyBannerData.data.find(item => item.entity_id === warp.entity_id);

                            addWarpItem(findResult);
                        });
                    })
                    .catch(error => {
                        console.error("There was a problem with the fetch operation:", error);
                    });
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
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
    /*
    const findResult = fireflyBannerData.data.find(item => item.entity_name === 'Firefly');
            
    addWarpItem(findResult);
    */

    switch(warp()) {
        case "SSR":
            // 50/50
            if(Math.random() < 0.5) {
                const findResult = fireflyBannerData.data.find(item => item.entity_name === 'Firefly');
                
                insertWarpToTable(findResult);
                addWarpItem(findResult);
                console.log("Warp: Firefly");
            } else {
                const findResult = fireflyBannerData.data.filter(item => item.rarity === 3 && item.rate_up === 1);
                
                const randomIndex = Math.floor(Math.random() * findResult.length);
                insertWarpToTable(findResult[randomIndex]);
                addWarpItem(findResult[randomIndex]);
                console.log("Warp: SSR");
            }

            break;
        case "SR":
            // 50/50
            if(Math.random() < 0.5) {
                const findResult = fireflyBannerData.data.filter(item => item.rarity === 2 && item.rate_up === 1);
                
                const randomIndex = Math.floor(Math.random() * findResult.length);
                insertWarpToTable(findResult[randomIndex]);
                addWarpItem(findResult[randomIndex]);
            } else {
                const findResult = fireflyBannerData.data.filter(item => item.rarity === 2 && item.rate_up === 0);
                
                const randomIndex = Math.floor(Math.random() * findResult.length);
                insertWarpToTable(findResult[randomIndex]);
                addWarpItem(findResult[randomIndex]);
            }

            break;
        case "R":
            const findResult = fireflyBannerData.data.filter(item => item.rarity === 1);
                
            const randomIndex = Math.floor(Math.random() * findResult.length);
            insertWarpToTable(findResult[randomIndex]);
            addWarpItem(findResult[randomIndex]);

            break;
        default:
    }
});

function warp() {
    const randomNum = Math.random();
    console.log(randomNum);
    if (randomNum < 0.006) {
        return "SSR";
    }

    if (randomNum < 0.057) {
        return "SR";
    }

    return "R";
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

function addWarpItem(entity) {
    // div
    const newDiv = document.createElement('div');

    // Condition for card bg color
    classNames = 'warp-item flex'
    switch (entity.rarity) {
    case 1:
        classNames = classNames + ' R'
        break;
    case 2:
        classNames = classNames + ' SR'
        break;
    case 3:
        classNames = classNames + ' SSR'
        break;
    default:
        // Code to be executed if expression doesn't match any case
    }
    newDiv.className = classNames
    
    // img
    const newImg = document.createElement('img');
    newImg.src = entity.file_path.replace(basePath, '');

    // h4
    const newH4 = document.createElement('h4');
    newH4.className = 'flex';
    newH4.innerHTML = entity.entity_name;

    // Add elements to their parents
    newDiv.appendChild(newImg);
    newDiv.appendChild(newH4);
    WarpItemsWrapper.appendChild(newDiv);
}

function insertWarpToTable(entity) {
    const body_data = {
        user_uid: uid,
        entity_id: entity.entity_id,
        banner_id: entity.banner_id
    };

    console.log(JSON.stringify(body_data));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(body_data) // Convert the data object to a JSON string
    };
    
    fetch('http://localhost/gacha-simulator/api/warp/create.php', options)
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