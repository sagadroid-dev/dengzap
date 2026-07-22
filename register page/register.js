     const passwordInput = document.getElementById("password");
            const togglePassword = document.getElementById("toggle-password");

            togglePassword.addEventListener("click", () => {
                passwordInput.type =
                    passwordInput.type === "password" ? "text" : "password";
            });