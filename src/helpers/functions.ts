import { createDocument, getDocument, updateDocument } from "./firestore";
import { Collection, MediaData } from "./types";

export const handleMediaFavorite = async (
  mediaData: MediaData,
  userEmail: string,
  mediaCollection: Collection
) => {
  const document = await getDocument(mediaCollection, userEmail);

  if (!document) {
    await createDocument(mediaCollection, userEmail, mediaData);
  }

  console.log(document);
  console.log(mediaData.mediaId);

  const index = document.findIndex(
    (item: any) =>
      item.mediaId === mediaData.mediaId &&
      item.mediaType === mediaData.mediaType
  );

  if (index === -1) {
    document.push(mediaData);
  } else {
    document.splice(index, 1);
  }

  await updateDocument(mediaCollection, userEmail, document);
};
