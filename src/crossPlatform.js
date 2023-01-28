export function getStorage(callback) {
    if (ENV === "chrome") {
        return chrome.storage.sync.get(callback);
    } else if (ENV === "firefox") {
        return browser.storage.sync.get().then(callback);
    } else {
        throw `Enviroment ${ENV} is not supported`;
    }
};

export function setStorage(data) {
    if (ENV === "chrome") {
        return chrome.storage.sync.set(data);
    } else if (ENV === "firefox") {
        return browser.storage.sync.set(data);
    } else {
        throw `Enviroment ${ENV} is not supported`;
    }
};