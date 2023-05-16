const photo = document.getElementById("img-signup");
const file = document.getElementById("foto");

photo.addEventListener("click", () => {
	file.click();
});

file.addEventListener("change", (e) => {
	if (file.files.lenght <= 0) {
		return;
	}
	let reader = new FileReader();
	reader.onload = () => {
		photo.src = reader.result;
	};
	reader.readAsDataURL(file.files[0]);
});
