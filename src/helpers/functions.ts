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
  } else {
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
  }

  console.log(document);
  console.log(mediaData.mediaId);

  await updateDocument(mediaCollection, userEmail, document);
};
