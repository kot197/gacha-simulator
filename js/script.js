
import { isEmpty } from './utility.js';
import { addWarpItem, insertWarpToTable, warp, countWarps, loadWarpRecord } from './core.js';
import { setupEventHandlers } from './eventHandlers.js';

const UIDText = document.getElementById('uid');

const TotalWarpsH4 = document.querySelector('#total-warps h4');
const TotalStellarJadeH4 = document.querySelector('#total-stellar-jade h4');
const PrevPageButton = document.getElementById('prev-page');
const NextPageButton = document.getElementById('next-page');

let fireflyBannerData;
let uid;

export const warpRecordObject = {
    currentBannerID: 2,
    limit: 100,
    skip: 0,
    warpRecords: {}
  };

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

            if(isEmpty(warpRecordObject.warpRecords)) {
                loadWarpRecord(fireflyBannerData, uid);
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}