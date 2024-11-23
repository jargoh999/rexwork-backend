import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(file: any) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({
      resource_type: 'auto',
    }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(file);
  });
}
