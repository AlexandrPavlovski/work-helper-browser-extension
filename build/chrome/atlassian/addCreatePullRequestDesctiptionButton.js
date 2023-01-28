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

  // src/atlassian/addCreatePullRequestDesctiptionButton.js
  var containerSelector = "div>span>span[data-test-id=content-buttons]";
  var theBtnId = "createPullRequestDescriptionButton";
  var mo = new MutationObserver(onMutation);
  observe();
  function onMutation() {
    const container = document.querySelector(containerSelector);
    const btn = document.getElementById(theBtnId);
    if (container && !btn) {
      mo.disconnect();
      appendTheButton(container);
      observe();
    }
  }
  function observe() {
    mo.observe(document, {
      subtree: true,
      childList: true
    });
  }
  function appendTheButton(container) {
    const theButton = createElementTheButton();
    container.insertBefore(theButton, container.childNodes[0]);
  }
  function createElementTheButton() {
    const theButtonStyle = document.createElement("style");
    theButtonStyle.innerHTML = `
    #${theBtnId} {
      border: none;
      border-radius: 3px;
      width: 32px;
    }

    #${theBtnId}:active {
      background: white;
    }
  `;
    document.head.appendChild(theButtonStyle);
    const theButton = createElementButton("Copy PR description", theBtnId, theButtonClick);
    return theButton;
  }
  function theButtonClick() {
    const releaseData = parsePage();
    const releasePrDescr = buildReleasePullRequestDescription(releaseData);
    navigator.clipboard.writeText(releasePrDescr);
  }
  function parsePage() {
    const tableBody = document.querySelector("div.pm-table-wrapper>table>tbody");
    const rows = Array.prototype.slice.call(tableBody.children);
    return rows.slice(1).flatMap((x) => {
      const cells = Array.prototype.slice.call(x.children);
      const tasks = tableCellToTasks(cells[1]);
      if (!tasks[0]) {
        return [];
      }
      const pullRequest = tableCellToPr(cells[2]);
      return [{ pullRequest, tasks }];
    });
  }
  function tableCellToTasks(cell) {
    const links = Array.prototype.slice.call(cell.getElementsByTagName("a"));
    return links.map((x) => {
      if (x.children.length == 0) {
        const taskNames = x.innerHTML.split(" ");
        return taskNames[taskNames.length - 1];
      }
    });
  }
  function tableCellToPr(cell) {
    const link = Array.prototype.slice.call(cell.getElementsByTagName("a"));
    return link[0]?.innerHTML ?? "";
  }
  function buildReleasePullRequestDescription(releaseData) {
    let result = "";
    for (let i = 0; i < releaseData.length; i++) {
      const dataPoint = releaseData[i];
      const prExists = !!dataPoint.pullRequest;
      result += `${i + 1}. ${prExists ? "!" + dataPoint.pullRequest + "\r\n" : ""}`;
      for (let j = 0; j < dataPoint.tasks.length; j++) {
        result += `#${dataPoint.tasks[j]} \r
`;
      }
      result += "\r\n";
    }
    return result;
  }
})();
