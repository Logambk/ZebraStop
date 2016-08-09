(function (){
	
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		processTitle('Zebra Stop is turned off');	//init
	});

	chrome.browserAction.onClicked.addListener(function(tab) {
		processTitle('Zebra Stop is turned on');	//toggle
	});
	
	function processTitle(title) {
		chrome.browserAction.getTitle({}, function(result) {
			if (result == title) {
				update ('zebra-128.png', 'Zebra Stop is turned off', 'enableZebraComments');
			} else {
				update ('zebra-crossed-128.png', 'Zebra Stop is turned on', 'disableZebraComments');
			}
		});
	}
	
	function update(icon, title, msg) {
		chrome.browserAction.setIcon({ path: icon });
		chrome.browserAction.setTitle({ title: title });
		chrome.tabs.query({}, function(tabs){
			for (var i = 0; i < tabs.length; i++) {
				chrome.tabs.sendMessage(tabs[i].id, {action: msg});
			}
		});
	}
})();

