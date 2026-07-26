import { db } from "../../services/firebase.js";

import {

    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ======================================
// Escutar mensagens
// ======================================

export function listenMessages(conversationId, currentUser){

    const chat =
        document.getElementById("chatMessages");

    const messagesRef = collection(
        db,
        "conversations",
        conversationId,
        "messages"
    );

    const q = query(
        messagesRef,
        orderBy("createdAt")
    );

    return onSnapshot(q,(snapshot)=>{

        chat.innerHTML = "";

        snapshot.forEach((doc)=>{

            const msg = doc.data();

            const div = document.createElement("div");

            div.classList.add("message");

            if(msg.author === currentUser.uid){

                div.classList.add("sent");

            }else{

                div.classList.add("received");

            }

            let hour = "";

            if(msg.createdAt){

                hour =
                    msg.createdAt
                    .toDate()
                    .toLocaleTimeString([],{

                        hour:"2-digit",
                        minute:"2-digit"

                    });

            }

            div.innerHTML = `

    <div class="message-bubble">

        <div class="message-text">

            ${msg.text}

        </div>

        <div class="message-time">

            ${hour}

        </div>

    </div>

`;

            chat.appendChild(div);

        });

        chat.scrollTop =
            chat.scrollHeight;

    });

}



// ======================================
// Enviar mensagem
// ======================================

export async function sendMessage(
    conversationId,
    currentUser,
    text
){

    if(!text.trim())
        return;

    const messagesRef = collection(
        db,
        "conversations",
        conversationId,
        "messages"
    );

    await addDoc(messagesRef,{

        author:
            currentUser.uid,

        text,

        createdAt:
            serverTimestamp()

    });

}