import cloudinary from "../utils/cloudinary";

const upload = async (image) => {
    const res = await cloudinary.v2.uploader.upload(image, {
      folder: "ecommerce_images",
    });

    return res;
};

export default upload;