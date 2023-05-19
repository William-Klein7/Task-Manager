//FUNÇÃO PARA VERIFICAR OS DADOS
function verificarCredenciais(email, senha) {
	if (typeof Storage !== "undefined") {
		var usuarios = localStorage.getItem("Usuarios");
		if (usuarios) {
			usuarios = JSON.parse(usuarios);

			for (var i = 0; i < usuarios.length; i++) {
				var usuario = usuarios[i];
				if (usuario.email === email && usuario.senha === senha) {
					console.log("Credenciais válidas. Usuário encontrado:", usuario);
					return true;
				}
			}
			window.location.href = "Login.html";
			alert("Email ou senha incorretos");
		} else {
			alert("Usuario não cadastrado");
		}
	} else {
		console.log("Desculpe, o localStorage não está disponível.");
	}
}

//FUNÇÃO PRINCIPAL
function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	if (verificarCredenciais(email, password)) {
		window.location.href = "app.html";
	}
}
