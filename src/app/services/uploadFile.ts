import cloudinary from "../lib/cloudinary";

export const uploadImage = async (imagePath: string) => {
try {
const result = await cloudinary.v2.uploader.upload(imagePath, {
});

return { success: true, result };
} catch (error) {
console.error('Error uploading image to Cloudinary:', error);
return { success: false, error };
}
};

