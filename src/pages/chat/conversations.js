import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { db } from "../../services/firebase.js";

export async function getOrCreateConversation(currentUser, otherUser) {

    const conversationId = [
        currentUser.uid,
        otherUser.uid
    ].sort().join("_");

    const conversationRef = doc(
        db,
        "conversations",
        conversationId
    );

    const conversation = await getDoc(conversationRef);

    if (!conversation.exists()) {

        await setDoc(conversationRef, {

            participants: [
                currentUser.uid,
                otherUser.uid
            ],

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

    }

    return conversationId;

}