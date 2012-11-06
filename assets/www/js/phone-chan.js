(function(pchan, undefined) {

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
												wrong while making your request"
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
											wrong while making your request"
					});
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send();
	}

	pchan.get_board = function(board, page) {
		url = "http://api.4chan.org/" + board + 
			    "/" + page + ".json";
		ajax_request(url, 
			function(board_obj) {
				//Handle success
				//Draw to screen, etc.
			},

			function(exception) {
				//Handle errors
			}
		);
	}

}(window.pchan = window.pchan || {}));
