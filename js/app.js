function loadingBar() {
	const loadingBarId = document.getElementById("loadingBarId");
	const loadingBarP = document.getElementById("loadingBarP");
	const numberToDo = document.getElementById("NumberTasksToDoId");
	let getQtdToDo = localStorage.getItem("QtdToDo");
	getQtdToDo = JSON.parse(getQtdToDo);
	let perCent = localStorage.getItem("perCent Completed:");
	if (isNaN(perCent) || perCent == null || perCent === 0) {
		loadingBarId.style.width = "0" + "%";
		loadingBarP.innerHTML = "0" + "% completed";
	} else {
		loadingBarId.style.width = perCent + "%";
		loadingBarP.innerHTML = perCent + "% completed";
	}
	if (isNaN(getQtdToDo) || getQtdToDo == null || getQtdToDo === 0) {
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
	localStorage.setItem(
		"QtdTotalTasks",
		college + work + study + personal + social + home
	);
}

function getLocalStorage() {
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
	let i = 0;
	let j = 0;
	let x = 0;
	let sum = 0;

	let userTasks = tasks.filter(function (task) {
		return task.email === userLog.email;
	});
	userTasks.forEach(function (task) {
		let date = task.date;
		let horaInicial = task.startTime;
		let horaFinal = task.endTime;

		if (date === currentDate) {
			if (horaInicial > hourAndMinutes) {
				x++;
			}
			if (horaInicial <= hourAndMinutes && horaFinal > hourAndMinutes) {
				j++;
			}
			if (horaInicial < hourAndMinutes && horaFinal < hourAndMinutes) {
				i++;
			}
		}
	});
	sum = ((x + j) / (x + j + i)) * 100;
	sum = 100 - sum;
	localStorage.setItem("QtdToDo", x);
	localStorage.setItem("QtdInProgress", j);
	localStorage.setItem("perCent Completed:", parseFloat(sum.toFixed(1)));
}
document.addEventListener("DOMContentLoaded", function () {
	showNameHome();
	getLocalStorage();
	loadingBar();
	countTasksByCategory();
});
