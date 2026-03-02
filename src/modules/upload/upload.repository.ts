import api from "../../lib/api";

export const uploadRepository = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const result = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data.imageUrl;
  },
};
