import { checkAuth } from "../../services/auth.js";

const user = await checkAuth();

if (!user) {
    window.location.href = "../login/index.html";
}
import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ============================
// SALA
// ============================

const params = new URLSearchParams(window.location.search);

const room =
    params.get("room") || "geral";


localStorage.removeItem("nickname");

let nickname = prompt("Digite seu nome:");

if (!nickname || nickname.trim() === "") {
    nickname = "Anônimo";
}

localStorage.setItem("nickname", nickname);


// ============================
// ELEMENTOS
// ============================

const chat =
    document.getElementById("chatMessages");

const input =
    document.getElementById("messageInput");

const send =
    document.getElementById("sendButton");


// ============================
// FIRESTORE
// ============================

const messagesRef = collection(
    db,
    "rooms",
    room,
    "messages"
);


// ============================
// ENVIAR
// ============================

async function sendMessage() {

    const text = input.value.trim();

    if (text === "")
        return;

    await addDoc(messagesRef, {

        author: nickname,

        text,

        createdAt: serverTimestamp()

    });

    input.value = "";

}

send.onclick = sendMessage;

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter")
        sendMessage();

});


// ============================
// RECEBER
// ============================

const q = query(
    messagesRef,
    orderBy("createdAt")
);

onSnapshot(q, (snapshot) => {

    chat.innerHTML = "";

   snapshot.forEach((doc) => {

    const msg = doc.data();

    const div = document.createElement("div");

    div.classList.add("message");

    if (msg.author === nickname) {
        div.classList.add("sent");
    } else {
        div.classList.add("received");
    }

    let hour = "";

    if (msg.createdAt) {

        const date = msg.createdAt.toDate();

        hour = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    div.innerHTML = `
        <div class="message-author">
            ${msg.author}
        </div>

        <div class="message-text">
            ${msg.text}
        </div>

        <div class="message-time">
            ${hour}
        </div>
    `;

    chat.appendChild(div);

});

    chat.scrollTop =
        chat.scrollHeight;
        console.log("Chat carregado!");

});