import { getStorage, setStorage } from "../crossPlatform";

getStorage(function(data) {
    document.getElementById('nameInput').value = data.name;
});

document.getElementById('saveBtn').addEventListener('click', function() {
    let name = document.getElementById('nameInput').value;
    setStorage({ name: name });
});