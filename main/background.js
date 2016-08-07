(function (){
	
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		processTitle('Disable Zebra');	//init
	});

	chrome.browserAction.onClicked.addListener(function(tab) {
		processTitle('Enable Zebra');	//toggle
	});
	
	function processTitle(title) {
		chrome.browserAction.getTitle({}, function(result) {
			if (result == title) {
				toggle ('zebra-128.png', 'Disable Zebra', 'enableZebra');
			} else {
				toggle ('zebra-crossed-128.png', 'Enable Zebra', 'disableZebra');
			}
		});
	}
	
	function toggle(icon, title, msg) {
		chrome.browserAction.setIcon({ path: icon });
		chrome.browserAction.setTitle({ title: title });
		chrome.tabs.query({}, function(tabs){
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, {action: msg});
			}
		});
	}
})();

