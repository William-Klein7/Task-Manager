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
			if (date === selectedDate) {
				container.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		} else if (date < currentDate && date === selectedDate) {
			p++;
			if (date === selectedDate) {
				container3.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		}
		if (date === currentDate && date === selectedDate) {
			if (horaInicial > hourAndMinutes) {
				x++;
				container.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
			if (horaInicial <= hourAndMinutes && horaFinal > hourAndMinutes) {
				j++;
				container2.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
			if (horaInicial < hourAndMinutes && horaFinal < hourAndMinutes) {
				i++;
				container3.appendChild(
					injecaoCodigo(category, title, horaInicial, horaFinal)
				);
			}
		}
	});
	sum = ((x + j) / (x + j + i)) * 100;
	sum = 100 - sum;
	localStorage.setItem("QtdToDo", x);
	localStorage.setItem("QtdInProgress", j);
	localStorage.setItem("perCent Completed:", parseFloat(sum.toFixed(1)));
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

document.addEventListener("DOMContentLoaded", function () {
	imprimirDatas();
	getDate();
	activeButton();
	showToDo();
	var botao = document.getElementById("Btn-active");
	botao.click();
});
