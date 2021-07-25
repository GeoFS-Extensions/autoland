interface options {
	ap: boolean
	fmc: boolean
}

var options: options = getCurrentOptions()

function getCurrentOptions(): options {
	var data: options
	chrome.storage.sync.get("options", (items) => {
		if (items.options) {
			data = items.options
		} else {
			data = {
				ap: false,
				fmc: false
			}
		}
	})

	return data
}

// update cache when storage changes
chrome.storage.onChanged.addListener(() => {
	options = getCurrentOptions()
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.name != "geoContentScript") {
		return
	}
	if (msg.needsData) {
		sendResponse({options: options})
	}
})