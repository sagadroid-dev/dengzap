import { checkAuth } from "../../services/auth.js";

import { loadUsers } from "./users.js";

import { getOrCreateConversation } from "./conversations.js";

import {
    listenMessages,
    sendMessage
} from "./messages.js";

let currentConversation = null;
let stopListening = null;

// =====================================
// AUTENTICAÇÃO
// =====================================

const currentUser = await checkAuth();

if (!currentUser) {

    window.location.href = "../login/index.html";

    throw new Error("Usuário não autenticado.");

}

// =====================================
// ELEMENTOS
// =====================================

const chatName = document.getElementById("chatName");
const chatStatus = document.getElementById("chatStatus");

const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");

// =====================================
// CARREGA USUÁRIOS
// =====================================

await loadUsers(
    currentUser,
    openConversation
);

// =====================================
// ABRIR CONVERSA
// =====================================

async function openConversation(user) {

    try {

        chatName.textContent = user.name;
        chatStatus.textContent = user.status ?? "";

        currentConversation =
            await getOrCreateConversation(
                currentUser,
                user
            );

        console.log("Conversa:", currentConversation);

        if (stopListening) {

            stopListening();

        }

        stopListening = listenMessages(
            currentConversation,
            currentUser
        );

        input.focus();

    } catch (error) {

        console.error(error);

        alert("Erro ao abrir conversa.");

    }

}

// =====================================
// ENVIAR MENSAGEM
// =====================================

async function handleSendMessage() {

    if (!currentConversation) {

        alert("Selecione uma conversa.");

        return;

    }

    const text = input.value.trim();

    if (text === "")
        return;

    try {

        await sendMessage(

            currentConversation,

            currentUser,

            text

        );

        input.value = "";

        input.focus();

    } catch (error) {

        console.error(error);

        alert("Erro ao enviar mensagem.");

    }

}

button.addEventListener(
    "click",
    handleSendMessage
);

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        handleSendMessage();

    }

});