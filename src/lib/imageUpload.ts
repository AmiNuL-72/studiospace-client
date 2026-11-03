import axios from "axios";

export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey || apiKey === "your_imgbb_api_key_here") {
    throw new Error("Please add your free ImgBB API key in .env.local (Get it at https://api.imgbb.com)");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data && response.data.success) {
    return response.data.data.url;
  }

  throw new Error("Failed to upload image to ImgBB");
}
