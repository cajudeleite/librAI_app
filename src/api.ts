import axios from "axios";

const baseUrl = "http://localhost:8000/";

export const getImagePrediction = async (image: any) => {
  const imageFile = new File([image], "image");

  try {
    const response = await axios.post(baseUrl + "predict", {
      img: imageFile,
    });

    return response.data.prediction;
  } catch (error) {
    throw error;
  }
};
