import { useEffect, useState } from "react";
import getAdressFromGeocode from "./helpers/getAddressFromGeocode";
import addData from "./helpers/addData";
import convertPhotoToBase64 from "./helpers/convertPhotoToBase64";
import { getDataFromLocalStorate } from "./helpers/useFetch";

const Form = ({ newMarkerGeocode, closeFormHandler, setVisibleMarkers }) => {
  const [shortDescription, setShortDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    let timeoutId;

    async function getAddress() {
      const address = await getAdressFromGeocode(newMarkerGeocode);
      setAddress(address);
    }

    function debounceGetAddress() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getAddress, 300);
    }

    debounceGetAddress();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [newMarkerGeocode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: Math.random().toFixed(5),
      shortDescription,
      pricePerDay,
      photo: photo ? await convertPhotoToBase64(photo) : null,
      geocode: newMarkerGeocode,
      address,
    };

    addData(formData);

    const updatedMarkers = getDataFromLocalStorate();

    setVisibleMarkers(updatedMarkers);

    setShortDescription("");
    setPricePerDay("");
    setPhoto(null);
    setAddress("");
    closeFormHandler();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <span onClick={closeFormHandler}>close</span>
      <label className="form__label">
        <span className="form__label-text">Short Description</span>
        <textarea
          className="form__input"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
        />
      </label>
      <label className="form__label">
        <span className="form__label-text">Price per Day</span>
        <input
          className="form__input"
          type="number"
          min={0}
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
        />
      </label>
      <label className="form__label">
        <span className="form__label-text">Attach a Photo</span>
        <input
          className="form__input"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </label>
      <label className="form__label">
        <span className="form__label-text">Pick address on a map</span>
        <textarea
          className="form__textarea"
          rows={3}
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <button className="form__submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
