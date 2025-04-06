import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export const GetFavorites = async (uid) => {
  console.log("GetFavorites called " + uid);
  const docSnap = await getDoc(doc(db,'Favorites',uid));
  if (docSnap?.exists()) {
    return docSnap.data().likedRecipes;
  } else {
    await setDoc(doc(db, "Favorites", uid), {
      UID: uid,
      likedRecipes: [],
    })
  }
}


export const UpdateFavorites = async (favs) => {
  const docRef = doc(db, "Favorites", uid);
  try {
    await updateDoc(docRef, {
      Favorites: favs
    })
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}