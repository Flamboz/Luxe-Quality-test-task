import { useEffect, useRef } from "react";

const List = ({
  visibleMarkers,
  selectedMarker,
  isDataPending,
  fetchingDataError,
}) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (selectedMarker && listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedMarker]);

  const { photo, shortDescription, pricePerDay, address } =
    selectedMarker || {};

  return (
    <div className="list" ref={listRef}>
      {isDataPending && <div>Loading ...</div>}
      {fetchingDataError && <div>{fetchingDataError}</div>}
      {selectedMarker && (
        <div className="list__item list__item--selected">
          <div className="list__card">
            <img src={photo} alt={shortDescription} className="list__image" />
            <div className="list__details">
              <h3 className="list__title">{shortDescription}</h3>
              <p className="list__price">${pricePerDay} per day</p>
              <p className="list__location">{address}</p>
            </div>
          </div>
        </div>
      )}
      <ul className="list__items">
        {visibleMarkers?.map((marker, index) => {
          const { shortDescription, pricePerDay, photo, address } = marker;

          return (
            <li key={index} className="list__item">
              <div className="list__card">
                <img
                  src={photo}
                  alt={shortDescription}
                  className="list__image"
                />
                <div className="list__details">
                  <h3 className="list__title">{shortDescription}</h3>
                  <p className="list__price">${pricePerDay} per day</p>
                  <p className="list__location">{address}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
