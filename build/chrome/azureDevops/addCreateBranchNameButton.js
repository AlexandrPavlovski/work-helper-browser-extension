(() => {
  // src/common.js
  function createElementButton(title, id, onClick) {
    const theButton = document.createElement("button");
    theButton.setAttribute("id", id);
    theButton.setAttribute("title", title);
    theButton.addEventListener("click", onClick);
    const imgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGcSURBVChTdZFLSyNBFIVPpTp21IaZhQp28BXf+BZEMIoiLkVnMci4Fxxcu9C9f8GF4N6V4B8QV240alQMgiCCG18kbR6dNt2da3V3EcjAfFBcOOdw69Yt/AuNxP86kwvrZxtbUvkPpHeSMRY/fhqN10vJR5G1wt7qGorkzn8amQiSpwUpIySrz87uQaMxNIRXPYrX5mapBlQFbdt57BsYBpgCrqhSDagKZnMFLf3xLoIhEONSDagK1tZpaGtvQTjEQaXCoZR9KsGbgfHpidQ19NQlBu8uoF8nZqVVzdvY5JHLa6i88ofMGpVStT9IWj6Vjj+pBLY4AxTz4lUOeDErnYBKsJy8As7vUc4bcMmFmFI6AX4w0dU9VVTVYQoT6PEZrjROln5ver6HH4zWab2KGulwLBNkWn4vJg7dJn55vgfv7OqnF8NYnjPSYKKVa5fE4m1YwrwPq62ZWE+DpreesFishzq+bMRzOdG+LIZlYtkuvsQuc5EIHhqakExn9lm0pa0XXHyX411oA5YDk6xtTa3fZYqaJc5hFvL4Bi92lRElTJWdAAAAAElFTkSuQmCC";
    const img = document.createElement("img");
    img.setAttribute("src", imgBase64);
    theButton.appendChild(img);
    return theButton;
  }

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

  // src/azureDevops/addCreateBranchNameButton.js
  var containerSelector = "div.workitem-info-bar.workitem-header-bar>div.info-text-wrapper";
  var theBtnId = "createBranchNameButton";
  var ticketTypes = [
    "USER STORY",
    "CHORE",
    "PROD DEFECT"
  ];
  var mo = new MutationObserver(onMutation);
  observe();
  async function onMutation() {
    const container = document.querySelector(containerSelector);
    const btn = document.getElementById(theBtnId);
    if (container && !btn && ticketTypes.some((x) => container.innerText.startsWith(x))) {
      mo.disconnect();
      await appendTheButton(container);
      observe();
    }
  }
  function observe() {
    mo.observe(document, {
      subtree: true,
      childList: true
    });
  }
  async function appendTheButton(container) {
    var storageData = await getStorage();
    const theButton = createElementTheButton(!!storageData.name);
    container.insertBefore(theButton, container.childNodes[1].nextSibling);
  }
  function createElementTheButton(isActive) {
    const theButtonStyle = document.createElement("style");
    theButtonStyle.innerHTML = `
    #${theBtnId} {
      border: none;
      border-radius: 3px;
      margin-right: 5px;
      padding: 1px;
      width: 18px;
      height: 18px;
      ${isActive ? "" : "filter: grayscale(70%) contrast(50%);"}
    }
  `;
    if (isActive) {
      theButtonStyle.innerHTML += `
      #${theBtnId}:active {
        background: white;
      }
    `;
    }
    document.head.appendChild(theButtonStyle);
    const title = isActive ? "Copy branch name" : "First, set your name in extension's settings";
    const theButton = createElementButton(title, theBtnId, theButtonClick);
    if (!isActive) {
      theButton.setAttribute("disabled", true);
    }
    return theButton;
  }
  async function theButtonClick() {
    const storageData = await getStorage();
    const workItemId = getWorkItemId();
    const workItemTitle = getWorkItemTitle();
    const workItemTitleFormatted = formatWorkItemTitle(workItemTitle);
    navigator.clipboard.writeText(`${storageData.name}/do${workItemId}/${workItemTitleFormatted}`);
  }
  function getWorkItemId() {
    const workItemIdSpanWrapper = document.getElementsByClassName("workitemcontrol work-item-control work-item-form-id initialized")[0];
    if (!workItemIdSpanWrapper) {
      throw "Cannot find work item id span wrapper";
    }
    const workItemIdSpan = workItemIdSpanWrapper.getElementsByTagName("span")[0];
    if (!workItemIdSpan) {
      throw "Cannot find work item id span";
    }
    return workItemIdSpan.innerHTML;
  }
  function getWorkItemTitle() {
    const workItemIdInputWrapper = document.getElementsByClassName("workitemcontrol work-item-control work-item-form-title initialized")[0];
    if (!workItemIdInputWrapper) {
      throw "Cannot find work item title input wrapper";
    }
    const workItemIdInput = workItemIdInputWrapper.getElementsByTagName("input")[0];
    if (!workItemIdInput) {
      throw "Cannot find work item title input";
    }
    return workItemIdInput.value;
  }
  function formatWorkItemTitle(text) {
    return text.trim().toLowerCase().replace(/[^0-9a-z -]/g, "").replace(/ /g, "-").replace("---", "-").replace("--", "-");
  }
})();
