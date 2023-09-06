import axios from "axios";

const baseUrl = "http://localhost:8000/";

export const getImagePrediction = async (image: any) => {
  try {
    const response = await axios.post(baseUrl + "predict", {
      img: image,
    });

    return response.data.prediction;
  } catch (error) {
    throw error;
  }
};
