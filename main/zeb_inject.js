(function (){
	var status = 'disableComments';
	chrome.runtime.sendMessage("init");
	
	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		if (msg.action == 'disableZebra') {
			status = 'disableComments';
		} else if (msg.action == 'enableZebra') {
			status = 'enableComments';
		}
	});
	
	function updateComments(id) {
		var initialPosts = document.getElementById(id);
		if (initialPosts) {
			var comments = initialPosts.querySelectorAll('a.author[data-from-id="4170620"]');
			for (var i = 0; i < comments.length; i++) {
				updateComment(comments[i]);
			}
		}
	}

	function updateComment(row) {
		var par = row.parentNode;
		while (!par.classList.contains('reply')) {
			par = par.parentNode;
		}
		
		if (status == 'disableComments') {
			par.style.display = 'none';
		} else if (status == 'enableComments') {
			par.style.display = 'block';
		}
	}
	
	setInterval(function() {
		updateComments('page_wall_posts');
		updateComments('feed_wall');
	}, 500);
})();