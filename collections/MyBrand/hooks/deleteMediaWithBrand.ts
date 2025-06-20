import type { CollectionAfterDeleteHook } from "payload";

export const deleteMediaWithBrand: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  try {
    console.log('Processing media files for brand:', doc.id);
    console.log('Brand document:', JSON.stringify(doc, null, 2));

    // Store media IDs before any deletion
    const logoId = doc.logo?.id;
    const coverImageId = doc.coverImage?.id;

    // Verify logo exists (required field)
    if (!logoId) {
      console.error(`Brand ${doc.id} is missing required logo`);
      throw new Error('Brand must have a logo');
    }

    // Delete logo first
    try {
      console.log(`Deleting logo with ID: ${logoId}`);
      await req.payload.delete({
        collection: "media",
        id: logoId,
        depth: 0,
      });
      console.log(`Successfully deleted logo with ID: ${logoId}`);
    } catch (error) {
      console.error(`Failed to delete logo ${logoId}:`, error);
      throw error;
    }

    // Handle cover image if it exists
    if (coverImageId) {
      try {
        console.log(`Deleting cover image with ID: ${coverImageId}`);
        await req.payload.delete({
          collection: "media",
          id: coverImageId,
          depth: 0,
        });
        console.log(`Successfully deleted cover image with ID: ${coverImageId}`);
      } catch (error) {
        // Log error but continue with brand deletion
        console.error(`Failed to delete cover image ${coverImageId}:`, error);
      }
    } else {
      console.log(`No cover image to delete for brand ${doc.id}`);
    }

    // Now delete the brand
    try {
      console.log(`Deleting brand with ID: ${doc.id}`);
      await req.payload.delete({
        collection: "mybrand",
        id: doc.id,
        depth: 0,
      });
      console.log(`Successfully deleted brand with ID: ${doc.id}`);
    } catch (error) {
      console.error(`Failed to delete brand ${doc.id}:`, error);
      throw error;
    }

  } catch (error) {
    console.error(`Failed to process brand deletion for ${doc.id}:`, error);
    throw error;
  }
};