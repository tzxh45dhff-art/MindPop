import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDx2KfOmiSGGHmws7rGPhCbYMHgNDeY5K0",
    authDomain: "mindpop-fdce2.firebaseapp.com",
    projectId: "mindpop-fdce2",
    storageBucket: "mindpop-fdce2.firebasestorage.app",
    messagingSenderId: "687851662367",
    appId: "1:687851662367:web:2555fa4a156d56a877f92a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LESSONS_COLLECTION = "videoLessons";

export async function saveVideoLesson(topic, title, videoUrl, projectId) {
    try {
        const docRef = await addDoc(collection(db, LESSONS_COLLECTION), {
            topic: topic || "General Topic",
            title: title || "Video Lesson",
            videoUrl: videoUrl,
            projectId: projectId,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to save video lesson to history.");
    }
}

export async function getUserVideoLessons() {
    try {
        const q = query(collection(db, LESSONS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const lessons = [];
        querySnapshot.forEach((doc) => {
            lessons.push({ id: doc.id, ...doc.data() });
        });
        return lessons;
    } catch (e) {
        console.error("Error fetching documents: ", e);
        // Fallback for cases where the composite index isn't ready yet or Firestore permission denied
        try {
            const fallbackQ = query(collection(db, LESSONS_COLLECTION));
            const fallbackSnapshot = await getDocs(fallbackQ);
            const fallbackLessons = [];
            fallbackSnapshot.forEach((doc) => {
                fallbackLessons.push({ id: doc.id, ...doc.data() });
            });
            // Sort by client side just in case
            return fallbackLessons.sort((a, b) => {
                const timeA = a.createdAt?.toDate?.() || new Date(0);
                const timeB = b.createdAt?.toDate?.() || new Date(0);
                return timeB - timeA;
            });
        } catch (innerErr) {
            console.error("Fallback fetch also failed: ", innerErr);
            return [];
        }
    }
}

export async function deleteVideoLesson(docId) {
    try {
        await deleteDoc(doc(db, LESSONS_COLLECTION, docId));
        return true;
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Failed to delete video lesson.");
    }
}
