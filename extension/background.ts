interface options {
	ap: boolean
	fmc: boolean
}

var options = getCurrentOptions()

function getCurrentOptions(): options {
	chrome.storage.sync.get("options", (items) => {
		if (items.options) {
			options = items.options
		} else {
			options = {
				ap: false,
				fmc: false
			}
		}
	})
	return
}

// update cache when storage changes
chrome.storage.onChanged.addListener(() => {
	options = getCurrentOptions()
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.needsData) {
		sendResponse({options: options})
	}
})