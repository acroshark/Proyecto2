import { useEffect, useState } from "react";
import { getSingleEnlaceservice } from "../services";

const useEnlace = (id) => {
  const [Enlace, setEnlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnlace = async () => {
      try {
        setLoading(true);

        const data = await getSingleEnlaceservice(id);

        setEnlace(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEnlace();
  }, [id]);

  return { Enlace, loading, error };
};

export default useEnlace;
