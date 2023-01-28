(() => {
  // src/crossPlatform.js
  function getStorage(callback) {
    if (true) {
      return chrome.storage.sync.get(callback);
    } else if (false) {
      return browser.storage.sync.get().then(callback);
    } else {
      throw `Enviroment ${"chrome"} is not supported`;
    }
  }
  function setStorage(data) {
    if (true) {
      return chrome.storage.sync.set(data);
    } else if (false) {
      return browser.storage.sync.set(data);
    } else {
      throw `Enviroment ${"chrome"} is not supported`;
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
