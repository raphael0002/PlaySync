import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (
  file,
  folder,
  publicId
) => {
  try {
    const result = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `turf_booking/${folder}`,
        public_id: publicId,
        transformation: [
          {
            width: 200,
            height: 200,
            crop: "fill",
            quality: "auto",
          },
          { fetch_format: "auto" },
        ],
      }
    );
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    throw new Error(
      `Image upload failed: ${error.message}`
    );
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(
      `Image deletion failed: ${error.message}`
    );
  }
};
