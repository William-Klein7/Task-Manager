// TASKS
var categoryButtons = document.querySelectorAll('button[name="categories"]');
var userLog = localStorage.getItem("UsuarioLogadoInfo");
userLog = JSON.parse(userLog);
var tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
var dateNew = new Date();
var currentDate = formatDate(dateNew);

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

//LOGIN
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
	localStorage.removeItem("UsuarioLogadoInfo");
	localStorage.removeItem("QtdToDo");
	localStorage.removeItem("QtdCompleted");
	localStorage.removeItem("perCent Completed:");

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

//HOME PAGE
function loadingBar() {
	const loadingBarId = document.getElementById("loadingBarId");
	const loadingBarP = document.getElementById("loadingBarP");
	const numberToDo = document.getElementById("NumberTasksToDoId");
	let getQtdToDo = localStorage.getItem("QtdToDo");
	getQtdToDo = JSON.parse(getQtdToDo);
	let perCent = localStorage.getItem("perCent Completed:");
	if (perCent === "null" || "NaN" || "undefined") {
		loadingBarId.style.width = "0" + "%";
		loadingBarP.innerHTML = "0" + "% completed";
	} else {
		loadingBarId.style.width = perCent + "%";
		loadingBarP.innerHTML = perCent + "% completed";
	}
	if (getQtdToDo == 0 || "null" || "undefined" || "NaN") {
		numberToDo.innerHTML = "No have more tasks";
	} else if (getQtdToDo == 1) {
		numberToDo.innerHTML = "You have " + getQtdToDo + " more task to do!";
	} else {
		numberToDo.innerHTML = "You have " + getQtdToDo + " more tasks to do!";
	}
}

function showNameHome() {
	const nameP = document.getElementById("nameP");
	const picture = document.getElementById("pictureId");
	let usuario = localStorage.getItem("UsuarioLogadoInfo");
	usuario = JSON.parse(usuario);
	nameP.innerHTML = usuario.nome + "!";
	if (usuario.foto === "") {
		picture.src = "images/SignupPage/img-sem-foto.jpg";
	} else {
		picture.src = usuario.foto;
	}
}

function countTasksByCategory() {
	const collegeP = document.getElementById("collegeP");
	const workP = document.getElementById("workP");
	const studyP = document.getElementById("studyP");
	const personalP = document.getElementById("personalP");
	const socialP = document.getElementById("socialP");
	const homeP = document.getElementById("homeP");
	let college = 0;
	let work = 0;
	let study = 0;
	let social = 0;
	let personal = 0;
	let home = 0;

	var userTasks = tasks.filter(function (task) {
		return task.email === userLog.email;
	});

	userTasks.forEach(function (task) {
		var category = task.category;

		if (category === "College stuff") {
			return college++;
		}
		if (category === "Study") {
			return study++;
		}
		if (category === "Work") {
			return work++;
		}
		if (category === "Social life") {
			return social++;
		}
		if (category === "Personal project") {
			return personal++;
		}
		if (category === "Home") {
			return home++;
		}
	});

	collegeP.innerHTML = college + " tasks";
	workP.innerHTML = work + " tasks";
	studyP.innerHTML = study + " tasks";
	personalP.innerHTML = personal + " tasks";
	socialP.innerHTML = social + " tasks";
	homeP.innerHTML = home + " tasks";
}

// CALENDAR PAGE:
function imprimirDatas() {
	var container = document.getElementById("container");
	var cards = container.getElementsByClassName("card");
	let currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 3);

	var monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	for (var i = 0; i < cards.length; i++) {
		var card = cards[i];
		var month = monthNames[currentDate.getMonth()];
		var day = currentDate.getDate();
		card.innerHTML = month + " " + day;

		currentDate.setDate(day + 1);

		if (i >= 11) {
			break;
		}
	}
}
function getDate() {
	let btnsDate = document.querySelectorAll(".container button");
	let selectedDate = currentDate;

	btnsDate.forEach(function (button) {
		button.addEventListener("click", function () {
			clearClassActive();
			this.classList.add("active");
			selectedDate = this.innerHTML;
			let formattedDate = formatDate(selectedDate);
			showToDo(formattedDate);
		});
	});

	function clearClassActive() {
		btnsDate.forEach(function (button) {
			button.classList.remove("active");
		});
	}
}
function formatDate(dateString) {
	let date = new Date(dateString);
	let year = new Date().getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");
	let formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}
function showToDo(selectedDate) {
	let bruteDate = new Date();
	let currentHour = bruteDate.getHours();
	let currentMinutes = bruteDate.getMinutes();

	if (currentHour < 10) {
		currentHour = "0" + currentHour;
	}
	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}
	let hourAndMinutes = currentHour + ":" + currentMinutes;
	console.log(hourAndMinutes);
	let container = document.getElementById("taskContainerId1");
	let container2 = document.getElementById("taskContainerId2");
	let container3 = document.getElementById("taskContainerId3");
	let i = 0;
	let j = 0;
	let x = 0;
	let p = 0;
	let sum = 0;
	container.innerHTML = "";
	container2.innerHTML = "";
	container3.innerHTML = "";

	let userTasks = tasks.filter(function (task) {
		return task.email === userLog.email;
	});
	userTasks.forEach(function (task) {
		let category = task.category;
		let date = task.date;
		let horaInicial = task.startTime;
		let horaFinal = task.endTime;
		let title = task.title;

		if (horaInicial < 12) {
			horaInicial += " am";
		} else {
			horaInicial += " pm";
		}
		if (horaFinal < 12) {
			horaFinal += " am";
		} else {
			horaFinal += " pm";
		}

		if (date > currentDate && date === selectedDate) {
			console.log("ToDo");
			if (date === selectedDate) {
				container.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		} else if (date < currentDate && date === selectedDate) {
			p++;
			console.log("Completed");
			if (date === selectedDate) {
				container3.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		}
		if (date === currentDate && date === selectedDate) {
			if (horaInicial > hourAndMinutes) {
				x++;
				console.log("ToDo");
				container.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
			if (horaInicial < hourAndMinutes && horaFinal > hourAndMinutes) {
				j++;
				console.log("InProgress");
				container2.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
			if (hourAndMinutes > horaFinal) {
				i++;
				console.log("Completed");
				container3.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		}
	});
	sum = ((x + j) / (x + j + i)) * 100;
	sum = 100 - sum;
	localStorage.setItem("QtdToDo", x);
	localStorage.setItem("perCent Completed:", parseFloat(sum.toFixed(1)));
	localStorage.setItem("QtdCompleted", i + p);
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

function activeButton() {
	let btns = document.querySelectorAll(".tk-btn-task button");
	const container = document.getElementById("taskContainerId1");
	const container2 = document.getElementById("taskContainerId2");
	const container3 = document.getElementById("taskContainerId3");

	btns.forEach(function (button) {
		button.addEventListener("click", function () {
			clearClassActive();
			this.classList.add("active");
			if (button.id === "toDoId") {
				container.style.display = "flex";
				container2.style.display = "none";
				container3.style.display = "none";
			}
			if (button.id === "inProgressId") {
				container.style.display = "none";
				container2.style.display = "flex";
				container3.style.display = "none";
			}
			if (button.id === "completedId") {
				container.style.display = "none";
				container2.style.display = "none";
				container3.style.display = "flex";
			}
		});
	});

	function clearClassActive() {
		btns.forEach(function (button) {
			button.classList.remove("active");
		});
	}
}

// PROFILE PAGE
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
	var QtdCompleted = localStorage.getItem("QtdCompleted");

	if ((QtdCompleted == 0 && QtdCompleted === "null") || "undefined") {
		title.innerHTML = "You do not have task completed!";
	} else if (QtdCompleted < 10 && QtdCompleted > 0) {
		title.innerHTML = "You have completed 0" + QtdCompleted + " tasks!";
	} else {
		title.innerHTML = "You have completed " + QtdCompleted + " tasks!";
	}
}

// EDIT PROFILE
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
