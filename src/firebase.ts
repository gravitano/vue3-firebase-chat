// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { computed, onUnmounted, ref } from 'vue';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC-wQlOpvCsmrK-uxX0-Otrj0BgKw3KyEQ',
  authDomain: 'vue3-fire-chat.firebaseapp.com',
  projectId: 'vue3-fire-chat',
  storageBucket: 'vue3-fire-chat.appspot.com',
  messagingSenderId: '853120250899',
  appId: '1:853120250899:web:77a3cc2049f97501487be6',
  measurementId: 'G-2WP4NM299G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const useAuth = () => {
  const user = ref<User | null>(null);

  const unsubscribe = onAuthStateChanged(auth, (_user) => (user.value = _user));
  // onUnmounted(unsubscribe);

  const isLogin = computed(() => user.value !== null);

  const signIn = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // ...

        localStorage.setItem('auth_token', token!);
        user.value = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log({
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  const logout = () => signOut(auth);

  return { user, isLogin, signIn, logout };
};

// const filter = new Filter();
export const db = getFirestore();

const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

export function useChat() {
  const messages = ref<DocumentData>([]);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats: DocumentData[] = [];
    snapshot.forEach((doc) => {
      chats.push(doc.data());
    });
    messages.value = chats;

    snapshot.docChanges().forEach((change) => {
      const index = messages.value.indexOf(change.doc.data());
      // if (change.type === 'added') {
      //   messages.value.push(change.doc.data());
      //   console.log('New city: ', change.doc.data());
      // }
      if (change.type === 'modified') {
        console.log('Modified city: ', change.doc.data());
        messages.value[index] = change.doc.data();
      }
      if (change.type === 'removed') {
        messages.value.splice(index, 1);
        console.log('Removed city: ', change.doc.data());
      }
    });
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();

  const sendMessage = async (text: string) => {
    if (!isLogin.value) {
      throw new Error('401');
      return;
    }

    const { photoURL, uid, displayName } = user.value as any;

    return addDoc(collection(db, 'messages'), {
      user: {
        displayName,
        uid,
        photoURL,
      },
      text: text,
      // text: filter.clean(text),
      createdAt: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
