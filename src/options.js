var my_options = {};

var /* const */ CONFIG_STORAGE_KEY = 'config';

/*
// Saves options to chrome.storage
function save_options() {
	let config_for_storage = {};
	config_for_storage[CONFIG_STORAGE_KEY] = my_options;
	
  	chrome.storage.sync.set(config_for_storage, function() {
    	// Update status to let user know options were saved.
    	var status = document.getElementById('status');
    	status.textContent = 'Options saved.';
    	setTimeout(function() {
      	status.textContent = '';
    	}, 750);

		// Send config update to extension
		chrome.runtime.sendMessage({type: "config-changed", config: my_options});
  	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(callback) {
  	chrome.storage.sync.get(
     	CONFIG_STORAGE_KEY,
  		function(items) {
	  		my_options = Object.assign({}, items);

			// Send config update to extension
			chrome.runtime.sendMessage({type: "config-changed", config: my_options});

  		  	callback();
  		}
	);

}
document.getElementById('save').addEventListener('click',
   save_options);

function update_ui_from_options() {}
	


$( function() {
	restore_options(update_ui_from_options);
});
*/

