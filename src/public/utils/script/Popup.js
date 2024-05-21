
// Functions
function OpenPopup() {
    let popupDiv = document.getElementById('popup-nhan-vien')

    popupDiv.classList.remove('hidden');
}

function ClosePopup() {
    let popupDiv = document.getElementById('popup-nhan-vien')

    popupDiv.classList.add('hidden');
}


// Events
document.getElementById('button-open-nhan-vien').addEventListener('click', OpenPopup);
document.getElementById('button-close-popup-nhan-vien').addEventListener('click', ClosePopup);





