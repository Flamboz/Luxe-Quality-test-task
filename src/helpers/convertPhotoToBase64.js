export default function convertPhotoToBase64(photo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
