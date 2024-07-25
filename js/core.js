import { warpRecordObject, dataObject } from './script.js';
import { setupEventHandlers } from './eventHandlers.js';
import { removeElementsExceptByIds } from './utility.js';

let basePath = 'C:\\xampp\\htdocs\\gacha-simulator\\';
const WarpItemsWrapper = document.getElementById('warp-items-wrapper');
const TotalWarpsH4 = document.querySelector('#total-warps h4');
const TotalStellarJadeH4 = document.querySelector('#total-stellar-jade h4');
const PrevPageButton = document.getElementById('prev-page');
const NextPageButton = document.getElementById('next-page');
const PageNumbersSpan = document.getElementById('page-numbers');

export function addWarpItem(entity) {
    // div
    const newDiv = document.createElement('div');

    // Condition for card bg color
    let classNames = 'warp-item flex'
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

export async function insertWarpToTable(entity) {
    const body_data = {
        user_uid: dataObject.uid,
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

            countWarps()
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

export function warp() {
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

export function countWarps() {
    fetch('http://localhost/gacha-simulator/api/warp/count.php')
                .then(response => {
                    if(!response.ok) {
                        throw new Error("Network response was not ok " + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    TotalWarpsH4.innerHTML = data.data[0].count;
                    TotalStellarJadeH4.innerHTML = data.data[0].count * 160;

                    if((warpRecordObject.skip + warpRecordObject.limit) >= data.data[0].count && !NextPageButton.hasAttribute('disabled')) {
                        NextPageButton.toggleAttribute('disabled');
                    }  else if ((warpRecordObject.skip + warpRecordObject.limit) < data.data[0].count && NextPageButton.hasAttribute('disabled')) {
                        NextPageButton.toggleAttribute('disabled');
                    }

                    PageNumbersSpan.innerHTML = `${(warpRecordObject.skip/warpRecordObject.limit)+1} / ${Math.ceil(data.data[0].count/warpRecordObject.limit)}`;
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error);
                });
}

export function loadWarpRecord() {
    fetch(`http://localhost/gacha-simulator/api/warp/read_banner_page.php?id=${warpRecordObject.currentBannerID}&limit=${warpRecordObject.limit}&skip=${warpRecordObject.skip}`)
                    .then(response => {
                        if(!response.ok) {
                            throw new Error("Network response was not ok " + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        warpRecordObject.warpRecords = data;

                        // Clean warp record first
                        removeElementsExceptByIds(WarpItemsWrapper.id, ['total-warps', 'total-stellar-jade']);

                        // Add each warp to DOM
                        warpRecordObject.warpRecords.data.forEach(warp => {
                            const findResult = dataObject.fireflyBannerData.data.find(item => item.entity_id === warp.entity_id);

                            addWarpItem(findResult);
                        });

                        // Update total warp count on h4
                        countWarps();

                        if(warpRecordObject.skip < warpRecordObject.limit && !PrevPageButton.hasAttribute('disabled')) {
                            PrevPageButton.toggleAttribute('disabled');
                        } else if (warpRecordObject.skip >= warpRecordObject.limit && PrevPageButton.hasAttribute('disabled')) {
                            PrevPageButton.toggleAttribute('disabled');
                        }
                    })
                    .catch(error => {
                        console.error("There was a problem with the fetch operation:", error);
                    });
}