(function (){
	var status = 'disableComments';
	chrome.runtime.sendMessage("init");
	
	chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		if (msg.action == 'disableZebraComments') {
			status = 'disableComments';
		} else if (msg.action == 'enableZebraComments') {
			status = 'enableComments';
		}
	});
	
	function updateComments(rootSelector, subSelector, parentClassStopper) {
		var root = document.querySelector(rootSelector);
		if (root) {
			var comments = root.querySelectorAll(subSelector);
			for (var i = 0; i < comments.length; i++) {
				updateComment(comments[i], parentClassStopper);
			}
		}
	}

	function updateComment(row, parentClassStopper) {
		var par = row;
		while (!par.classList.contains(parentClassStopper)) {
			par = par.parentNode;
		}
		
		if (status == 'disableComments') {
			par.style.display = 'none';
		} else if (status == 'enableComments') {
			par.style.display = 'block';
		}
	}
	
	setInterval(function() {
		updateComments('#page_wall_posts', 'a.author[data-from-id="4170620"]', 'reply');							//group wall
		updateComments('#feed_wall', 'a.author[data-from-id="4170620"]', 'reply');									//feed page
		updateComments('#wk_box', 'a.author[data-from-id="4170620"]', 'reply');										//pop-up post
		updateComments('.wall_replies', '.al_u4170620', 'comment_item');											//pop-up post for moblie version
		updateComments('#pv_wide', 'div[onclick="Photoview.commentClick(this, event, 4170620)"]', 'pv_comment');	//picture
	}, 500);
})();