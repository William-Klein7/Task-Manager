const photo = document.getElementById("img-signup");
const file = document.getElementById("foto");
var arrName = [];
var arrEmail = [];
var arrOccupation = [];
var arrPassword = [];

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

//FUNÇÕES DE VALIDAÇÃO
function validarEmailExistente(email) {
	if (localStorage.Email) {
		arrEmail = JSON.parse(localStorage.getItem("Email"));
	}

	if (arrEmail) {
		for (let i = 0; i < arrEmail.length; i++) {
			if (arrEmail[i] === email) {
				return false;
			}
		}
	}
	return true;
}
function validarEmail(email) {
	// Expressão regular para validar o formato do email
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (regexEmail.test(email)) {
		return true;
	} else {
		return false;
	}
}
function validarNome(nome) {
	if (nome.length >= 3) {
		return true;
	} else {
		return false;
	}
}
function validarOccupation(occupation) {
	if (occupation.length >= 2) {
		return true;
	} else {
		return false;
	}
}
function validarSenha(senha) {
	const regexMaiuscula = /[A-Z]/;
	const regexMinuscula = /[a-z]/;
	const regexDigito = /[0-9]/;

	if (
		senha.match(regexMaiuscula) &&
		senha.match(regexMinuscula) &&
		senha.match(regexDigito)
	) {
		return true;
	} else {
		return false;
	}
}

//FUNÇÕES PARA SALVAR DADOS DENTRO DE UM ARRAY
function saveName(nome) {
	if (localStorage.Name) {
		arrName = JSON.parse(localStorage.getItem("Name"));
	}
	arrName.push(nome);
	document.getElementById("nameId").value = "";
	localStorage.Name = JSON.stringify(arrName);
}

function saveOccupation(occupation) {
	if (localStorage.Occupation) {
		arrOccupation = JSON.parse(localStorage.getItem("Occupation"));
	}
	arrOccupation.push(occupation);
	document.getElementById("occupationId").value = "";
	localStorage.Occupation = JSON.stringify(arrOccupation);
}
function saveEmail(email) {
	if (localStorage.Email) {
		arrEmail = JSON.parse(localStorage.getItem("Email"));
	}

	arrEmail.push(email);
	document.getElementById("emailId").value = "";
	localStorage.Email = JSON.stringify(arrEmail);
}
function savePassword(password) {
	if (localStorage.Password) {
		arrPassword = JSON.parse(localStorage.getItem("Password"));
	}
	arrPassword.push(password);
	document.getElementById("passwordId").value = "";
	localStorage.Password = JSON.stringify(arrPassword);
}

//FUNÇÃO PRINCIPAL
function save() {
	const nome = document.getElementById("nameId").value;
	const occupation = document.getElementById("occupationId").value;
	const email = document.getElementById("emailId").value;
	const password = document.getElementById("passwordId").value;

	if (!validarNome(nome)) {
		alert("Invalid name");
		document.getElementById("nameId").value = "";
	}

	if (!validarOccupation(occupation)) {
		alert("Invalid occupation");
		document.getElementById("occupationId").value = "";
	}

	if (!validarEmail(email)) {
		alert("Invalid email");
		document.getElementById("emailId").value = "";
	}
	if (!validarSenha(password)) {
		alert("Invalid password");
		document.getElementById("passwordId").value = "";
	}
	if (!validarEmailExistente(email)) {
		alert("Error: email address already registered!");
		document.getElementById("emailId").value = "";
	}
	if (
		validarNome(nome) &&
		validarOccupation(occupation) &&
		validarEmail(email) &&
		validarEmailExistente(email) &&
		validarSenha(password)
	) {
		saveName(nome);
		saveOccupation(occupation);
		saveEmail(email);
		savePassword(password);
	}
}
