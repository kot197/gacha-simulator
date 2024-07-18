let basePath = 'C:\\xampp\\htdocs\\gacha-simulator\\';
const WarpItemsWrapper = document.getElementById('warp-items-wrapper');

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

export function insertWarpToTable(entity, uid) {
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