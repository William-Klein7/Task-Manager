//FUNÇÕES PARA VERIFICAR OS DADOS
function verificarEmail(email) {
	const localEmail = localStorage.getItem("Email");

	if (localEmail) {
		const arrEmail = JSON.parse(localEmail);

		for (let i = 0; i < arrEmail.length; i++) {
			if (arrEmail[i] === email) {
				return true;
			}
		}
	}
	return false;
}
function verificarPassword(senha) {
	const localPassword = localStorage.getItem("Password");

	if (localPassword) {
		const arrPassword = JSON.parse(localPassword);

		for (let i = 0; i < arrPassword.length; i++) {
			if (arrPassword[i] === senha) {
				return true;
			}
		}
	}
	return false;
}
function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if (!verificarEmail(email) && !verificarPassword(password)) {
		alert("Usuario não cadastrado");
	} else if (!verificarEmail(email)) {
		alert("Email incorreto");
	} else if (!verificarPassword(password)) {
		alert("Senha Incorreta");
	}
	if (verificarEmail(email) && verificarPassword(password)) {
		window.location.href = "home.html";
	}
}
