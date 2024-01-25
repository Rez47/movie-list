import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Collection, MediaData } from "./types";

export const getDocument = async (
  collection: Collection,
  userEmail: string
) => {
  try {
    const document = await getDoc(doc(db, collection, userEmail));

    if (!document.exists()) {
      console.log("No such document!");
      return;
    }

    return document.data().media;
  } catch (e) {
    console.error("Error getting a document: ", e);
  }
};

export const createDocument = async (
  collection: Collection,
  userEmail: string,
  body: MediaData
) => {
  try {
    await setDoc(doc(db, collection, userEmail), {
      media: [body],
    });
  } catch (e) {
    console.error("Error adding a document: ", e);
  }
};

export const updateDocument = async (
  collection: Collection,
  userEmail: string,
  body: string[]
) => {
  try {
    const document = await getDoc(doc(db, collection, userEmail));

    if (!document.exists()) {
      console.log("No such document!");
    } else {
      console.log("Document data:", document.data());
    }

    await setDoc(doc(db, collection, userEmail), { media: body });
  } catch (e) {
    console.error("Error updating a document: ", e);
  }
};

export const deleteDocument = async (
  collection: Collection,
  userEmail: string
) => {
  try {
    await deleteDoc(doc(db, collection, userEmail));
  } catch (e) {
    console.error("Error deleting a document: ", e);
  }
};
