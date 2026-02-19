var current_page = "portfolio";

var pages = {
	"portfolio": {
		content: document.querySelector("#portfolio"),
		title: document.querySelector("#portfolio-title")
	},
	"game-development": {
		content: document.querySelector("#game-development"),
		title: document.querySelector("#game-development-title")
	},
	"professional-experience" :
	{
		content: document.querySelector("#professional-experience"),
		title: document.querySelector("#professional-experience-title")
	},
	"education": {
		content: document.querySelector("#education"),
		title: document.querySelector("#education-title")
	},
	"skills": {
		content: document.querySelector("#skills"),
		title: document.querySelector("#skills-title")
	},
	"timeline": {
		content: document.querySelector("#timeline"),
		title: document.querySelector("#timeline-title")
	},
	"contact": {
		content: document.querySelector("#contact"),
		title: document.querySelector("#contact-title")
	}
};
var game_development = document.querySelector("#game-development");

var scroll_containers = document.getElementsByClassName("scrollable-container");

function scrollAllToTop() {
	for(var i = 0; i < scroll_containers.length; i++) {
		scroll_containers[i].scrollTo(0, 0);
	}
}

function navigate(page) {
	if (page == current_page) return;

	scrollAllToTop();

	pages[current_page].content.classList.remove("selected");
	pages[current_page].title.classList.remove("selected");
	current_page = page;
	pages[current_page].content.classList.remove("invisible");
	pages[current_page].content.classList.add("selected");
	pages[current_page].title.classList.add("selected");
}