(function (){
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.browserAction.getTitle({}, function(result) {
			if (result == 'Enable Zebra') {
				toggle ('zebra-128.png', 'Disable Zebra', 'enableZebra', tab);
			} else {
				toggle ('zebra-crossed-128.png', 'Enable Zebra', 'disableZebra', tab);
			}
		});
	});
	
	function toggle(icon, title, msg, tab) {
		chrome.browserAction.setIcon({ path: icon });
		chrome.browserAction.setTitle({ title: title });
		chrome.tabs.query({active: true}, function(tabs){
			chrome.tabs.sendMessage(tab.id, {action: msg}, function(response) { })
		});
	}
})();

