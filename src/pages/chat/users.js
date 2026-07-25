import { db } from "../../services/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export async function loadUsers(currentUser, onUserClick){

    const list = document.getElementById("conversationList");

    list.innerHTML = "";

    const snapshot = await getDocs(
        collection(db,"users")
    );

    console.log("Quantidade de usuários:", snapshot.size);

    snapshot.forEach((doc)=>{

        if(doc.id === currentUser.uid)
            return;

        const user = doc.data();

        const div = document.createElement("div");

        div.className = "message-container";

        div.innerHTML = `
            <div class="message-container_picture"></div>

            <div class="message-container_messages">

                <p class="message-container_name">

                    ${user.name}

                </p>

                <p class="message-container_text">

                    ${user.status}

                </p>

            </div>

            <div class="message-container-timestamp">

            </div>
        `;

        div.onclick = ()=>{

            onUserClick({
                uid:doc.id,
                ...user
            });

        };

        list.appendChild(div);

    });

}