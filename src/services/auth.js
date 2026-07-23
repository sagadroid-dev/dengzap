import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

export async function register(username, email, password) {

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        name: username,
        email: user.email,
        photo: "",
        bio: "",
        status: "Online",
        createdAt: new Date(),
        lastSeen: new Date()
    });

    return userCredential;
}

export async function login(email, password) {

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function logout() {

    await signOut(auth);
}

export function checkLogin(callback) {

    onAuthStateChanged(auth, callback);
}