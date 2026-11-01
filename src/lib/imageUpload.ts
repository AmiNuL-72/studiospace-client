import axios from "axios";

export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is missing. Set NEXT_PUBLIC_IMGBB_API_KEY in .env.local");
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
