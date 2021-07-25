interface popupState {
	ap: boolean
	fmc: boolean
}

var options: popupState = getCurrentOptions()

function getCurrentOptions(): popupState {
	var data: popupState
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