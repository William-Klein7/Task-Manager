var categoryButtons = document.querySelectorAll('button[name="categories"]');
var userLog = localStorage.getItem("UsuarioLogadoInfo");
userLog = JSON.parse(userLog);
var tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
var dateNew = new Date();
var currentDate = formatDate(dateNew);

//VALIDAÇÃO DA SENHA
function validarSenha(senha) {
	const regexSenha = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;

	if (senha.match(regexSenha)) {
		return true;
	} else {
		return false;
	}
}

//MODAL/CREATE TASK
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

function salvarTask(
	email,
	title,
	date,
	startTime,
	endTime,
	category,
	description
) {
	var task = localStorage.getItem("Tasks");
	if (task) {
		task = JSON.parse(task);
	} else {
		task = [];
	}
	var novaTask = {
		email: email,
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

	var taskDuplicada = tasks.find(function (task) {
		return task.date === date && task.startTime === startTime;
	});

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
	} else if (startTime >= endTime) {
		alert("A hora final deve ser maior que a hora inicial!");
	} else if (date < currentDate) {
		alert("A data não pode ser anterior à data atual!");
	} else if (startTime >= endTime) {
		alert("A hora final deve ser maior que a hora inicial!");
	} else if (taskDuplicada) {
		alert("Já existe uma tarefa no mesmo dia e horário!");
	} else {
		salvarTask(
			userLog.email,
			title,
			date,
			startTime,
			endTime,
			category,
			description
		);
		clearTasks();
		alert("Task salva com sucesso");
	}
}
function clearTasks() {
	document.getElementById("titleId").value = "";
	document.getElementById("dateId").value = "";
	document.getElementById("startId").value = "";
	document.getElementById("endId").value = "";
	document.getElementById("descriptionId").value = "";
}

//LOGIN, LOGOUT E VERIFICAÇÃO DE LOGIN
function verificarLogin() {
	var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
	const janela = window.location.pathname;
	console.log(window.location.pathname);
	if (
		usuarioLogado ||
		janela === "/login.html" ||
		janela === "/signup.html" ||
		janela === "/FirstPage.html"
	) {
		return;
	} else {
		window.location.href = "login.html";
	}
}

function fazerLogin() {
	localStorage.setItem("usuarioLogado", "true");
	window.location.href = "app.html";
}

function fazerLogout() {
	localStorage.removeItem("usuarioLogado");
	localStorage.removeItem("UsuarioLogadoInfo");
	localStorage.removeItem("QtdToDo");
	localStorage.removeItem("perCent Completed:");
	localStorage.removeItem("QtdInProgress");
	localStorage.removeItem("QtdTotalTasks");
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
				usuario = JSON.stringify(usuario);
				localStorage.setItem("UsuarioLogadoInfo", usuario);
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
}

// CALENDAR PAGE:
function formatDate(dateString) {
	let date = new Date(dateString);
	let year = new Date().getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}
function formatDateYeasterday(dateString) {
	let date = new Date(dateString);
	date.setDate(date.getDate() - 1);

	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}
function injecaoCodigo(category, title, horaInicial, horaFinal) {
	let element = document.createElement("div");
	element.className = "card-tasks";
	element.innerHTML =
		"<p>" +
		category +
		"</p>" +
		"<h1>" +
		title +
		"</h1>" +
		"<h2>" +
		horaInicial +
		" - " +
		horaFinal +
		"</h2>";
	return element;
}

// PROFILE PAGE
function modificarUsuario() {
	var arrUsuarios = localStorage.getItem("Usuarios");
	let senha = document.getElementById("passwordEdit").value;
	let nome = document.getElementById("nameEdit").value;
	let occupation = document.getElementById("occupationEdit").value;
	let foto = document.getElementById("img-signup").src;

	if (arrUsuarios) {
		arrUsuarios = JSON.parse(arrUsuarios);
	} else {
		arrUsuarios = [];
	}
	if (nome === "") {
		return alert("Insira um nome");
	} else if (occupation === "") {
		return alert("Insira uma ocupação");
	} else if (!validarSenha(senha)) {
		return alert(
			"Senha invalida, insira no minimo 6 caracteres,incluindo uma letra maiuscula,uma minuscula e um digito!"
		);
	}

	for (var i = 0; i < arrUsuarios.length; i++) {
		var usuario = arrUsuarios[i];
		if (userLog.email === usuario.email) {
			usuario.senha = senha;
			usuario.nome = nome;
			usuario.ocupacao = occupation;
			usuario.foto = foto;
		}
	}

	var arrUsuariosJSON = JSON.stringify(arrUsuarios);

	localStorage.setItem("Usuarios", arrUsuariosJSON);
	localStorage.setItem("UsuarioLogadoInfo", arrUsuariosJSON);

	alert("Usuário modificado com sucesso!");
	window.location.href = "Login.html";
}

function editProfile() {
	const photo = document.getElementById("img-signup");
	const file = document.getElementById("foto");
	photo.addEventListener("click", () => {
		file.click();
	});

	file.addEventListener("change", () => {
		if (file.files.lenght <= 0) {
			return;
		}
		let reader = new FileReader();
		reader.onload = () => {
			photo.src = reader.result;
		};
		reader.readAsDataURL(file.files[0]);
	});
}

// NOTIFICATION PAGE
function formatTimeDifference(startTime, endTime) {
	let start = new Date("2000-01-01 " + startTime);
	let end = new Date("2000-01-01 " + endTime);

	let difference = Math.round((start - end) / 1000 / 60);
	let hours = Math.floor(difference / 60);
	let minutes = difference % 60;

	let formattedDifference = "";

	if (hours > 0) {
		formattedDifference += hours + "h";
	}
	if (minutes > 0) {
		if (formattedDifference !== "") {
			formattedDifference += " ";
		}
		formattedDifference += minutes + "min";
	}
	return formattedDifference;
}

//REDIRECIONAMENTO
function redirecionarParaHome() {
	window.location.href = "app.html";
}
function redirecionarParaCalendar() {
	window.location.href = "calendar.html";
}
function createTask() {
	window.location.href = "modal.html";
}
function redirecionarParaProfile() {
	window.location.href = "profile.html";
}
function redirecionarParaCalendarCompleted() {
	window.location.href = "calendar.html";
	activeCompleted();
}
function RedirecionamentoEditProfile() {
	window.location.href = "editProfile.html";
}
function redirecionarParaNotification() {
	window.location.href = "notification.html";
}
