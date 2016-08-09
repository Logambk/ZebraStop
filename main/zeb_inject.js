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
	
	function updateComments(selector) {
		var initialRoot = document.querySelector(selector);
		if (initialRoot) {
			updateSubSelector(initialRoot, 'a.author[data-from-id="4170620"]');
			updateSubSelector(initialRoot, '.al_u4170620');
		}
	}
	
	function updateSubSelector(root, selector) {
		var comments = root.querySelectorAll(selector);
		for (var i = 0; i < comments.length; i++) {
			updateComment(comments[i]);
		}
	}

	function updateComment(row) {
		var par = row.parentNode;
		while (!par.classList.contains('reply') && !par.classList.contains('comment_item')) {
			par = par.parentNode;
		}
		
		if (status == 'disableComments') {
			par.style.display = 'none';
		} else if (status == 'enableComments') {
			par.style.display = 'block';
		}
	}
	
	setInterval(function() {
		updateComments('#page_wall_posts');	//group wall
		updateComments('#feed_wall');		//feed page
		updateComments('#wk_box');			//pop-up post
		updateComments('.wall_replies');	//pop-up for moblie version		
	}, 500);
})();