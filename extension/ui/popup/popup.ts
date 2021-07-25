interface popupState {
	ap: boolean
	fmc: boolean
}

interface buttons {
	ap: HTMLElement,
	fmc: HTMLElement
}

var ap = false
var fmc = false
var buttons: buttons
var options: popupState

function flipBool (toFlip: "ap" | "fmc"): void {
	if (toFlip == "ap") {
		ap = !ap
		if (ap && fmc) {
			flipBool("fmc")
		}
	} else {
		fmc = !fmc
	}
}

function writeStateToMemory(state: popupState): popupState {
	chrome.storage.sync.set({options: state}, () => {})
	return state
}

// TODO: this function returns undefined because the background script hasn't responded
function askBackgroundForOptions(): popupState {
	var data: popupState
	chrome.runtime.sendMessage({
		needsData: true
	}, (resp) => {
		data = resp.options
	})

	return data
}

function getCurrentButtonState(): buttons {
	return {
		ap: document.getElementById("apbutton"),
		fmc: document.getElementById("fmcbutton")
	}
}

function getCurrentPopupState(): popupState {
	return {
		ap: ap,
		fmc: fmc
	}
}

function hideOrShowFMCButton(show: boolean, button: HTMLElement): void {
	if (show) {
		button.style.display = ""
	} else {
		button.style.display = "none"
	}
}

function updateButtons(buttons: buttons, bools: popupState): buttons {
	if (bools.ap) {
		buttons.ap.className = "running"
		hideOrShowFMCButton(true, buttons.fmc)
	} else {
		buttons.ap.className = "button"
		hideOrShowFMCButton(false, buttons.fmc)
	}

	if (bools.fmc) {
		buttons.fmc.className = "running"
	} else {
		buttons.fmc.className = "button"
	}
	
	return getCurrentButtonState()
}

window.onload = () => {
	options = askBackgroundForOptions()
	buttons = getCurrentButtonState()
	console.log(options)
	console.log(buttons)
	updateButtons(buttons, options)


	buttons.ap.addEventListener("click", () => {
		flipBool("ap")
		options = getCurrentPopupState()
		updateButtons(buttons, options)
		writeStateToMemory(options)
	})

	buttons.fmc.addEventListener("click", () => {
		flipBool("fmc")
		options = getCurrentPopupState()
		updateButtons(buttons, options)
		writeStateToMemory(options)
	})
}