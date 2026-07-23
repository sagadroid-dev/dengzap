
import { register } from "../../services/auth.js";

const usernameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const confirmPasswordInput = document.querySelector(".confirm-password-input");

const submitButton = document.querySelector(".submit-button");

// Mostrar / esconder senha (se existir o botão)
const togglePassword = document.getElementById("toggle-password");

if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        passwordInput.type =
            passwordInput.type === "password" ? "text" : "password";
    });
}

// Cadastro
submitButton.addEventListener("click", async () => {

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Preencha todos os campos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    try {

        await register(username, email, password);

        alert("Conta criada com sucesso!");

        window.location.href = "../chat/index.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});
document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", () => {

        const input = document.getElementById(button.dataset.target);

        input.type =
            input.type === "password"
                ? "text"
                : "password";

    });

});