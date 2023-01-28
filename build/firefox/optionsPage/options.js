(() => {
  // src/crossPlatform.js
  function getStorage(callback) {
    if (false) {
      return chrome.storage.sync.get(callback);
    } else if (true) {
      return browser.storage.sync.get().then(callback);
    } else {
      throw `Enviroment ${"firefox"} is not supported`;
    }
  }
  function setStorage(data) {
    if (false) {
      return chrome.storage.sync.set(data);
    } else if (true) {
      return browser.storage.sync.set(data);
    } else {
      throw `Enviroment ${"firefox"} is not supported`;
    }
  }

  // src/optionsPage/options.js
  getStorage(function(data) {
    document.getElementById("nameInput").value = data.name;
  });
  document.getElementById("saveBtn").addEventListener("click", function() {
    let name = document.getElementById("nameInput").value;
    setStorage({ name });
  });
})();
