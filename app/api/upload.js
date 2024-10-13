import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Để Next.js xử lý các yêu cầu một cách đồng bộ
export const config = {
  api: {
    bodyParser: false, // Tắt bodyParser để sử dụng formidable
  },
};

// API handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing files:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error parsing files." });
      }

      const uploadPromises = Object.values(files).map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            file.filepath,
            { tags: ["ecommerce_images"] },
            (error, result) => {
              if (error) {
                console.error("Error uploading to Cloudinary:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
        });
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        return res.status(200).json({ success: true, uploadResults });
      } catch (error) {
        console.error("Error during upload:", error);
        return res.status(500).json({ success: false, message: error.message });
      }
    });
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
}
