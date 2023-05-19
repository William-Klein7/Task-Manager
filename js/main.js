var categoryButtons = document.querySelectorAll('button[name="categories"]');
function clearCategorySelection() {
	for (var i = 0; i < categoryButtons.length; i++) {
		categoryButtons[i].classList.remove("selected");
	}
}
for (var i = 0; i < categoryButtons.length; i++) {
	categoryButtons[i].addEventListener("click", function () {
		clearCategorySelection();
		this.classList.add("selected");
	});
}
