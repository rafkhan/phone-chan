/*
 *
 *
 */
(function(pchan, undefined) {

	var storage = window.localStorage;

	/*
	 * Params:
	 * 	url: pretty obvious
	 * 	success_func(object): callback on successful request
	 * 	error_fun(exception): callback on failed request
	 */
	function ajax_request(url, success_func, error_func) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				// xhr.status = 0 because of some file:// protocol crap
				if(xhr.status == 200 || xhr.status == 0) {
					if(xhr.responseText !== "") {
						success_func.call(undefined, JSON.parse(xhr.responseText));
					} else { //empty response text
						error_func.call(undefined, {
							name: "Request Error",
							message: "Oops! Something unexpected went\
												wrong while making your request.\nResp: "
							          + xhr.responseText + "\nStatus: " + xhr.status
						});
					}
				} else if(xhr.status == 404) { //404 error, not found
					error_func.call(undefined, {
						name: "Not Found",
						message: "404 error, page not found"
					});
				} else {
					error_func.call(undefined, {
						name: "Request Error",
						message: "Oops! Something unexpected went\
											wrong while making your request.\nStatus: "
						          + xhr.status
					});
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send();
	}

	/*
	 * Downloads board, given the board code
	 * and page #. sets callbacks to print
	 * out board.
	 */
	pchan.get_board = function(board, page) {
		url = "http://api.4chan.org/" + board + 
			    "/" + page + ".json";
		ajax_request(url, 
			function(board_obj) {
				print_board(board_obj);
			},

			function(exception) {
				//Handle errors
				alert(exception.name + ": " + exception.message);
			}
		);
	}

	/*
	 * Dowloads thread, given board, and
	 * thread #.Sets callbacks to print thread.
	 */
	pchan.get_thread = function(board, t_id) {
		url = "http://api.4chan.org/" + board +
			    "/res/" + t_id + ".json";
		ajax_request(url,
			function(thread_obj) {
				print_thread(thread_obj);
			},

			function(exception) {
				//Handle errors
				alert(exception.name + ": " + exception.message);
			}
		);
	}

	/*
	 * Iterate over object and print out
	 * post content to the screen.
	 */
	function print_board(obj) {
		cont = $('#content');

		threads = obj.threads;
		for(a = 0; a < threads.length; a++) {
			posts = threads[a].posts;
			for(b = 0; b < posts.length; b++) {
				post = posts[b];
				cont.append(post.no + '<br />');
			}
			cont.append('<hr />');
		}
	}

	/*
	 * TODO: This.
	 *
	 * Iterate over thread obj and print
	 * contents to screen.
	 */
	function print_thread(obj) {

	}

	/*
	 * Implement public methods from localStorage
	 * so the storage variable is not in
	 * global scope.
	 */
	// Set item in local storage, by key and value
	pchan.set_item = function(key, val) {
		storage.setItem(key, val);
	}

	// Retrieve value at key
	pchan.get_item = function(key) {
		return storage.getItem(key);
	}

	// Remove item at key
	pchan.remove_item = function(key) {
		storage.removeItem(key);
	}

	// Remove all items from storage
	pchan.clear_storage = function() {
		storage.clear();
	}

	// Wrapper around ondeviceready
	pchan.device_ready = function(func) {
		document.addEventListener("deviceready", func, false);
	}

}(window.pchan = window.pchan || {}));
