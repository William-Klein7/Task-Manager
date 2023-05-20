var categoryButtons = document.querySelectorAll('button[name="categories"]');

categoryButtons.forEach(function (button) {
	button.addEventListener("click", function () {
		clearCategorySelection();
		this.classList.add("selected");
	});
});

function clearCategorySelection() {
	categoryButtons.forEach(function (button) {
		button.classList.remove("selected");
	});
}

function categoryValue() {
	var selectedButton = document.querySelector(
		'button[name="categories"].selected'
	);
	if (selectedButton) {
		return selectedButton.innerText.trim();
	}
	return "";
}

function salvarTask(title, date, startTime, endTime, category, description) {
	var task = localStorage.getItem("Tasks");
	if (task) {
		task = JSON.parse(task);
	} else {
		task = [];
	}
	var novaTask = {
		title: title,
		date: date,
		startTime: startTime,
		endTime: endTime,
		category: category,
		description: description,
	};

	task.push(novaTask);
	var taskJSON = JSON.stringify(task);
	localStorage.setItem("Tasks", taskJSON);
}

function saveTask() {
	const title = document.getElementById("titleId").value;
	const date = document.getElementById("dateId").value;
	const startTime = document.getElementById("startId").value;
	const endTime = document.getElementById("endId").value;
	const description = document.getElementById("descriptionId").value;
	const category = categoryValue();

	if (title === "") {
		alert("Insira um título");
	} else if (date === "") {
		alert("Insira uma data");
	} else if (startTime === "") {
		alert("Insira um tempo de início");
	} else if (endTime === "") {
		alert("Insira um tempo de fim");
	} else if (category === "") {
		alert("Selecione uma categoria");
	} else {
		salvarTask(title, date, startTime, endTime, category, description);
	}
}

//FUNÇÃO PARA VERIFICAR OS DADOS

function verificarLogin() {
	var usuarioLogado = localStorage.getItem("usuarioLogado");

	if (!usuarioLogado && window.location.pathname !== "/login.html") {
		window.location.href = "login.html";
	} else if (usuarioLogado && window.location.pathname === "/login.html") {
		window.location.href = "app.html";
	}
}

function fazerLogin() {
	localStorage.setItem("usuarioLogado", "true");
	window.location.href = "app.html";
}

function fazerLogout() {
	localStorage.removeItem("usuarioLogado");
	window.location.href = "Login.html";
}

window.addEventListener("load", verificarLogin);

function verificarCredenciais(email, senha) {
	let usuarios = localStorage.getItem("Usuarios");
	if (usuarios) {
		usuarios = JSON.parse(usuarios);

		for (let i = 0; i < usuarios.length; i++) {
			var usuario = usuarios[i];
			if (usuario.email === email && usuario.senha === senha) {
				console.log("Credenciais válidas. Usuário encontrado:", usuario);
				fazerLogin();

				return true;
			}
		}
		alert("Email ou senha incorretos");
	} else {
		alert("Usuário não cadastrado");
	}
}

function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	verificarCredenciais(email, password);
	salvarEmail(email);
}
function salvarEmail(email) {
	localStorage.setItem("email", email);
}

function redirecionarParaHome() {
	window.location.href = "app.html";
}
function createTask() {
	window.location.href = "modal.html";
}

//FUNÇÕES DA HOME
function loadingBar(perCent) {
	const loadingBarId = document.getElementById("loadingBarId");
	const loadingBarP = document.getElementById("loadingBarP");
	loadingBarId.style.width = perCent + "%";
	loadingBarP.innerHTML = perCent + "% completed";
}
loadingBar(100);

function taskCounter(college, work, study, personal, social, home) {
	const collegeP = document.getElementById("collegeP");
	const workP = document.getElementById("workP");
	const studyP = document.getElementById("studyP");
	const personalP = document.getElementById("personalP");
	const socialP = document.getElementById("socialP");
	const homeP = document.getElementById("homeP");

	console.log(collegeP);
	collegeP.innerHTML = college + " tasks";
	workP.innerHTML = work + " tasks";
	studyP.innerHTML = study + " tasks";
	personalP.innerHTML = personal + " tasks";
	socialP.innerHTML = social + " tasks";
	homeP.innerHTML = home + " tasks";
}
taskCounter(0, 0, 0, 0, 0, 0);

function showName() {
	const nameP = document.getElementById("nameP");
	const picture = document.getElementById("pictureId");
	let usuarios = localStorage.getItem("Usuarios");
	let email = localStorage.getItem("email");
	if (usuarios) {
		usuarios = JSON.parse(usuarios);

		for (let i = 0; i < usuarios.length; i++) {
			var usuario = usuarios[i];
			if (usuario.email === email) {
				nameP.innerHTML = usuario.nome + "!";
				if (usuario.foto === "") {
					picture.src = "images/SignupPage/img-sem-foto.jpg";
				} else {
					picture.src = usuario.foto;
				}
				return;
			}
		}
	}
	console.log(nameP);
	console.log(usuario.nome);
	console.log(typeof usuario.nome);
}
showName();
