import { createElementButton } from "../common";
import { getStorage } from "../crossPlatform";


const containerSelector = "div.workitem-info-bar.workitem-header-bar>div.info-text-wrapper";
const theBtnId = "createBranchNameButton";

const ticketTypes = [
  "USER STORY",
  "CHORE",
  "PROD DEFECT"
];

const mo = new MutationObserver(onMutation);
observe();


async function onMutation() {
  const container = document.querySelector(containerSelector);
  const btn = document.getElementById(theBtnId);

  if (container && !btn && ticketTypes.some(x => container.innerText.startsWith(x))) {
    mo.disconnect();
    await appendTheButton(container);
    observe();
  }
}

function observe() {
  mo.observe(document, {
    subtree: true,
    childList: true,
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

  const title = isActive
    ? "Copy branch name"
    : "First, set your name in extension's settings";
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
  return text
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z -]/g, "")
    .replace(/ /g, "-")
    .replace("---", "-")
    .replace("--", "-");
}