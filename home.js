import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    // YOUR FIREBASE CONFIG HERE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User logged in:", user);

        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
            } else {
                console.log("No user document found in Firestore");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }

        // Redirect to home page after successful login
        window.location.href = "index.html";
    } else {
        console.log("No user logged in");
    }
});

// Logout function
const logoutButton = document.getElementById('logout');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out");
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    });
}
