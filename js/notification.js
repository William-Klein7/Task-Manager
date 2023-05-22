function notification() {
	let bruteDate = new Date();
	let currentHour = bruteDate.getHours();
	let currentMinutes = bruteDate.getMinutes();
	if (currentHour < 10) {
		currentHour = "0" + currentHour;
	}
	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}
	let dateYeasterday = formatDateYeasterday(dateNew);
	console.log(dateYeasterday);

	let hourAndMinutes = currentHour + ":" + currentMinutes;
	let container = document.querySelector("#containerNotificationId1");
	let container2 = document.querySelector("#containerNotificationId2");

	let userTasks = tasks.filter(function (task) {
		return task.email === userLog.email;
	});
	userTasks.forEach(function (task) {
		let date = task.date;
		let horaInicial = task.startTime;
		let horaFinal = task.endTime;
		let title = task.title;

		if (date === currentDate) {
			if (horaInicial < hourAndMinutes && horaFinal > hourAndMinutes) {
				let calcAgo = formatTimeDifference(hourAndMinutes, horaInicial);
				let element = document.createElement("div");
				element.className = "tk-box-notification";
				element.innerHTML =
					"<h2>" +
					calcAgo +
					" ago</h2>" +
					"<p>" +
					userLog.nome +
					", your <span>" +
					title +
					"</span> should start now.</p>";
				container.insertBefore(element, container.firstChild);
			}
			if (horaInicial < hourAndMinutes && horaFinal < hourAndMinutes) {
				let calcAgo = formatTimeDifference(hourAndMinutes, horaFinal);
				let element = document.createElement("div");
				element.className = "tk-box-notification";
				element.innerHTML =
					"<h2>" +
					calcAgo +
					" ago</h2>" +
					"<p>Congrats, your <span>" +
					title +
					"</span> is now completed.</p>";
				container.insertBefore(element, container.firstChild);
			}
		}
		if (date === dateYeasterday) {
			if (horaInicial < hourAndMinutes && horaFinal > hourAndMinutes) {
				let element = document.createElement("div");
				element.className = "tk-box-notification";
				element.innerHTML =
					"<h2>" +
					date +
					" " +
					horaInicial +
					"</h2>" +
					"<p>" +
					userLog.nome +
					", your <span>" +
					title +
					"</span> should start now.</p>";
				container2.insertBefore(element, container.firstChild);
			}
			if (horaInicial < hourAndMinutes && horaFinal < hourAndMinutes) {
				let element = document.createElement("div");
				element.className = "tk-box-notification";
				element.innerHTML =
					"<h2>" +
					date +
					" " +
					horaFinal +
					"</h2>" +
					"<p>Congrats, your <span>" +
					title +
					"</span> is now completed.</p>";
				container2.insertBefore(element, container.firstChild);
			}
		}
	});
}

function addClassToFirstElement() {
	var container = document.getElementById("containerNotificationId1");

	if (container) {
		var elements = container.getElementsByClassName("tk-box-notification");

		if (elements.length > 0) {
			elements[0].classList.add("tk-first-element-ativado");
			elements[0].classList.remove("tk-box-notification");
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	notification();
	addClassToFirstElement();
});
