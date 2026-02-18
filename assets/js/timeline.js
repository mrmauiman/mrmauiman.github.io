var dateMarkerTemplate = document.querySelector(".date-marker.template");
var timeline = document.querySelector(".timeline");
var height;
var thisYearOffset = 0;

const MARKER_TOP_OFFSET = 35;
const THIS_YEAR = 2026;
const BIRTH_YEAR = 2012;
const YEAR_SPACING = 800;

window.addEventListener("load", onLoad);

function onLoad() {
	setTimelineSize();
	placeMarkers();
	placeEvents();
}

function setTimelineSize() {
	thisYearOffset = Math.abs(parseInt(YEAR_SPACING * getDatePos("present")));
	timeline.style.height = `${YEAR_SPACING * (THIS_YEAR-BIRTH_YEAR) + thisYearOffset}px`
	height = timeline.clientHeight;
}

function placeMarkers() {
	let nowDateMarker = dateMarkerTemplate.cloneNode(true);
	timeline.appendChild(nowDateMarker);
	nowDateMarker.classList.remove("template");
	let date = nowDateMarker.querySelector("span.date");
	date.innerHTML = "PRESENT";
	date.style.width = "200px";
	nowDateMarker.style.top = `${MARKER_TOP_OFFSET}px`;
	for (var i = 0; i <= THIS_YEAR-BIRTH_YEAR; i++){
		let newDateMarker = dateMarkerTemplate.cloneNode(true);
		timeline.appendChild(newDateMarker);
		newDateMarker.classList.remove("template");
		let date = newDateMarker.querySelector("span.date");
		date.innerHTML = THIS_YEAR - i;
		newDateMarker.style.top = `${MARKER_TOP_OFFSET + thisYearOffset + (YEAR_SPACING * i)}px`;
	}
}

function getDatePos(date){
	
	if (date == "present") {
		var now = new Date();
		date = [now.getMonth()+1, now.getDate(), now.getFullYear()];
	} else {
		date = date.split("/");
	}

	let year_offset = (THIS_YEAR - parseInt(date[2]));
	let month_offset = ((parseInt(date[0])-1)/12);
	let day_offset = (((parseInt(date[1]))/31)/12);
	console.log(date, year_offset, month_offset, day_offset);
	return year_offset - month_offset - day_offset;
}

function getTopPixels(val) {
	return `${MARKER_TOP_OFFSET + thisYearOffset + parseInt(YEAR_SPACING * val)}px`;
}

function getBottomPixels(val) {
	return `${height-(MARKER_TOP_OFFSET + thisYearOffset + parseInt(YEAR_SPACING * val))}px`;
}

function verifyContentFits(event, top, bottom) {
	top = parseInt(getTopPixels(top));
	bottom = parseInt(getTopPixels(bottom));
	var minHeight = event.clientHeight;
	console.log(minHeight);
	console.log(bottom-top);
	if ((bottom - top) > minHeight) return true;
	
	event.classList.remove("connect-bottom");
	var newBottomBar = document.createElement("div");
	event.appendChild(newBottomBar);
	newBottomBar.classList.add("bottom-bar");
	if (event.classList.contains("connect-left")){
		newBottomBar.classList.add("left");
	} else {
		newBottomBar.classList.add("right");
	}
	console.log(minHeight-(bottom-top));
	newBottomBar.style.bottom = `${minHeight-(bottom-top)}px`;
	
	
	return false;
}

function placeEvents() {
	let events = document.getElementsByClassName("event");
	for (let i = 0; i < events.length; i++) {
		if (events[i].classList.contains("spanning")) {
			let top_val = getDatePos(events[i].dataset.endDate);
			let bottom_val = getDatePos(events[i].dataset.startDate);
			events[i].style.top = getTopPixels(top_val);
			if (verifyContentFits(events[i], top_val, bottom_val)){
				events[i].style.bottom = getBottomPixels(bottom_val);
			}
		} else {
			let loc_val = getDatePos(events[i].dataset.date);
			if (events[i].classList.contains("connect-top")) {
				events[i].style.top = getTopPixels(loc_val);
			} else if (events[i].classList.contains("connect-bottom")) {
				events[i].style.bottom = getBottomPixels(loc_val);
			}
		}
	}
}