import axios from "axios";

const baseUrl = "https://libraiapp.xyz";

export const getImagePrediction = async (image: any) => {
  try {
    const formData = new FormData();

    formData.append("img", image);

    const response = await axios.post(`${baseUrl}/predict`, formData);

    return response.data.prediction;
  } catch (error) {
    throw error;
  }
};
