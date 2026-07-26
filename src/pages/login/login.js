import { login } from "../../services/auth.js";

const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    try {

        await login(email, password);

        window.location.href = "../chat/index.html";

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/invalid-credential":
                alert("Email ou senha incorretos.");
                break;

            case "auth/invalid-email":
                alert("Email inválido.");
                break;

            case "auth/too-many-requests":
                alert("Muitas tentativas. Tente novamente mais tarde.");
                break;

            default:
                alert(error.message);

        }

    }

});
[emailInput, passwordInput].forEach(input => {

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            loginButton.click();

        }

    });

});