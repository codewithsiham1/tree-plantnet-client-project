import axios from 'axios';

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
    formData
  );

  if (res.data && res.data.data && res.data.data.display_url) {
    return res.data.data.display_url;
  } else {
    throw new Error('Image upload failed');
  }
};
