const selector = "div.workitem-info-bar.workitem-header-bar>div.info-text-wrapper";
const theBtnId = "createBranchNameButton";

const theButton = document.createElement("button");
theButton.setAttribute("id", theBtnId);
theButton.style.cssText = `
  border: none;
`;
theButton.addEventListener("click", function () {
    console.log("lol");
});



const mo = new MutationObserver(onMutation);
observe();


function onMutation() {
  const container = document.querySelector(selector);
  const btn = document.getElementById(theBtnId);

  if (container && !btn) {
    mo.disconnect();
    container.appendChild(theButton);
    observe();
  }
}

function observe() {
  mo.observe(document, {
    subtree: true,
    childList: true,
  });
}
