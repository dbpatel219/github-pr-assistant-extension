console.log("PR assistant loaded...")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "pr_assist" ) {
    	if (! prAssistDivExists()) {
      		checkForTests();
  		}
    }
  }
);

function checkForTests() {
	console.log("Checking for tests....Hang tight!");
	var githubFloatingDiv = $x("//*[@id=\"files_bucket\"]/div[4]/div/div[2]")[0];
	var containerElement = $x("//*[@id=\"files_bucket\"]")[0];

	var warningDivElement = document.createElement("div");
	warningDivElement.setAttribute("id", "prAssistDiv");
	warningDivElement.className = "diffbar-item";

	var warningSpanElement = document.createElement("span");
	if (githubFloatingDiv && ! hasTestFile()) {
		warningSpanElement.className = "text-red";
		warningSpanElement.textContent = "No Test Warning!";
	} else {
		warningSpanElement.className = "text-green";
		warningSpanElement.textContent = "Tests...Check!";
	}

	warningDivElement.appendChild(warningSpanElement);
	if (typeof githubFloatingDiv != 'undefined' && githubFloatingDiv.parentNode !== null) {
		githubFloatingDiv.parentNode.insertBefore(warningDivElement, githubFloatingDiv.nextSibling);
	}
}

function prAssistDivExists() {
	return $x("//*[@id=\"prAssistDiv\"]").length > 0;
}

function hasTestFile() {
	var foundTestFile = false;
	var potentialFileElements = document.getElementsByClassName('user-select-contain');
	for (var i = 0; i < potentialFileElements.length; i++) {
    	if (potentialFileElements[i].className == 'user-select-contain') {
        	foundTestFile = potentialFileElements[i].title.indexOf("Test") !== -1 || 
        	potentialFileElements[i].title.indexOf("Spec") !== -1
        	if (foundTestFile) {
        		console.log("Found a potential test class");
        		break;
        	}
    	}
	}
	return foundTestFile;
}

function $x(path){
   var xpath = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var temp = [];
   for (var i = xpath.snapshotLength - 1; i >= 0; i--) {
     temp.push(xpath.snapshotItem(i));
   }
   return temp;
}
