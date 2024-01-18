import { getDocument, updateDocument } from "./firestore";
import { Collection } from "./types";

export const handleMediaFavorite = async (
  movieId: string,
  userEmail: string,
  mediaType: Collection
) => {
  const document = await getDocument(mediaType, userEmail);

  // if (!document) return;

  // const mediaArray = document.length > 0 ? document.media : [];

  // const mediaIndex = mediaArray.findIndex((media: any) => media.id === movieId);

  // if (mediaIndex === -1) {
  //   mediaArray.push({ id: movieId });
  // } else {
  //   mediaArray.splice(mediaIndex, 1);
  // }

  // await updateDocument(mediaType, userEmail, mediaArray);
};
