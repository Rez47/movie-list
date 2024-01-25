import { createDocument, getDocument, updateDocument } from "./firestore";
import { Collection } from "./types";

export const handleMediaFavorite = async (
  movieId: string,
  userEmail: string,
  mediaType: Collection
) => {
  const document = await getDocument(mediaType, userEmail);

  if (!document) {
    await createDocument(mediaType, userEmail, movieId);
  }

  const index = document.indexOf(movieId);

  if (index === -1) {
    document.push(movieId);
  } else {
    document.splice(index, 1);
  }

  await updateDocument(mediaType, userEmail, document);
};
