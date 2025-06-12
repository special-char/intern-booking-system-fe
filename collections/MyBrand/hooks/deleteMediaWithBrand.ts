import type { CollectionAfterDeleteHook } from "payload";

export const deleteMediaWithBrand: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  try {
    const mediaFiles = [
      { id: doc.logo?.id, type: 'logo' },
      { id: doc.coverImage?.id, type: 'cover image' }
    ].filter(media => media.id);

    for (const media of mediaFiles) {
      try {
        await req.payload.delete({
          collection: "media",
          id: media.id,
        });
      } catch (error) {
        console.error(
          `Failed to delete ${media.type} media ${media.id}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(`Failed to delete media files for brand:`, error);
    throw error;
  }
};