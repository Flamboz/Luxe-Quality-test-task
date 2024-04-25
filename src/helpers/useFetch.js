import { useState, useEffect } from "react";
import { initialData } from "./initialData";

const mockTimer = (ms = 500) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

export const getDataFromLocalStorate = () => {
  const itemFromLocalstorage = JSON.parse(localStorage.getItem("data"));

  if (!itemFromLocalstorage) {
    return initialData;
  }

  return itemFromLocalstorage;
};

const useFetch = (visibleMarkers) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    mockTimer()
      .then(() => {
        setIsPending(false);
        setError(null);
        setData(getDataFromLocalStorate());
      })
      .catch((err) => {
        console.err(err);
        setIsPending(false);
        setError(err.message);
      });
  }, [visibleMarkers]);

  return { data, isPending, error };
};

export default useFetch;
