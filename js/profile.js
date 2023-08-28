function showName() {
	let pictureProf = document.getElementById("pictureProf");
	let nameProf = document.getElementById("nameProf");
	let occupationProf = document.getElementById("occupationProf");
	let usuario = localStorage.getItem("UsuarioLogadoInfo");
	usuario = JSON.parse(usuario);

	occupationProf.innerHTML = usuario.ocupacao;
	nameProf.innerHTML = usuario.nome;
	if (usuario.foto === "") {
		pictureProf.src = "images/SignupPage/img-sem-foto.jpg";
	} else {
		pictureProf.src = usuario.foto;
	}
}
function showNumberTasksCompleted() {
	const title = document.getElementById("NumberTotalCompleted");
	let QtdToDo = localStorage.getItem("QtdToDo");
	let QtdInProgress = localStorage.getItem("QtdInProgress");
	let QtdTotalTasks = localStorage.getItem("QtdTotalTasks");
	QtdToDo = JSON.parse(QtdToDo);
	QtdInProgress = JSON.parse(QtdInProgress);
	QtdTotalTasks = JSON.parse(QtdTotalTasks);
	let sub = QtdTotalTasks - QtdToDo - QtdInProgress;

	if (sub <= 0) {
		title.innerHTML = "You do not have task completed!";
	} else if (sub < 10 && sub > 0) {
		title.innerHTML = "You have completed 0" + sub + " tasks!";
	} else {
		title.innerHTML = "You have completed " + sub + " tasks!";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	showName();
	showNumberTasksCompleted();
});
