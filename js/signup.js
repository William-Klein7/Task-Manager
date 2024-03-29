const photo = document.getElementById("img-signup");
const file = document.getElementById("foto");
var arrEmail = [];

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

//FUNÇÃO PARA SALVAR OS DADOS INFORMADOS PELO USUARIO
function salvarUsuario(nome, email, senha, ocupacao, foto) {
	if (typeof Storage !== "undefined") {
		var arrUsuarios = localStorage.getItem("Usuarios");
		if (arrUsuarios) {
			arrUsuarios = JSON.parse(arrUsuarios);
		} else {
			arrUsuarios = [];
		}

		var usuario = {
			nome: nome,
			email: email,
			senha: senha,
			ocupacao: ocupacao,
			foto: foto,
		};

		arrUsuarios.push(usuario);

		var arrUsuariosJSON = JSON.stringify(arrUsuarios);

		localStorage.setItem("Usuarios", arrUsuariosJSON);

		alert("Usuário salvo com sucesso!");
	} else {
		alert("Error");
	}
}

//FUNÇÃO PRINCIPAL
function save() {
	const nome = document.getElementById("nameId").value;
	const occupation = document.getElementById("occupationId").value;
	const email = document.getElementById("emailId").value;
	const password = document.getElementById("passwordId").value;
	const foto = document.getElementById("img-signup").src;

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
		salvarUsuario(nome, email, password, occupation, foto);
		window.location.href = "Login.html";
	}
}
