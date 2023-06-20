import { useEffect, useState } from "react";
import { getAllEnlacesService, getUserEnlacesService } from "../services";

const useEnlaces = (id) => {
  const [Enlaces, setEnlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlaces = async () => {
      try {
        setLoading(true);

        const data = id
          ? await getUserEnlacesService(id)
          : getAllEnlacesService();

        setEnlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEnlaces();
  }, [id]);

  const addEnlace = (Enlace) => {
    setEnlaces([Enlace, ...Enlaces]);
  };

  const removeEnlace = (id) => {
    setEnlaces(Enlaces.filter((Enlace) => Enlace.id !== id));
  };
  return { Enlaces, loading, error, addEnlace, removeEnlace };
};

export default useEnlaces;
