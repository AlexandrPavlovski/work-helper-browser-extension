import { createElementButton } from "../common";


const containerSelector = "div>span>span[data-test-id=content-buttons]";
const theBtnId = "createPullRequestDescriptionButton";

const mo = new MutationObserver(onMutation);
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
    childList: true,
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
  return rows.slice(1).flatMap(x => {
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
  return links.map(x => {
      if (x.children.length == 0) { // excluding tasks that are stricken through
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
          result += `#${dataPoint.tasks[j]} \r\n`;
      }
      result += "\r\n";
  }

  return result;
}
