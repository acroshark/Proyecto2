import React, { useState, useEffect } from "react";
import axios from "axios";

const Enlace = ({
  enlaceId,
  initialIsvoted = false,
  initialvotesCount = 0,
}) => {
  const [isvoted, setIsvoted] = useState(initialIsvoted);
  const [votesCount, setvotesCount] = useState(initialvotesCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlevoteClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/Enlaces/${enlaceId}/vote`, {
        isvoted: !isvoted,
      });

      if (response.status === 200) {
        setIsvoted(!isvoted);
        setvotesCount((prevvotesCount) =>
          isvoted ? prevvotesCount - 1 : prevvotesCount + 1
        );
      } else {
        throw new Error('No se pudo actualizar el estado de "vote"');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEnlaceData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/Enlaces/${enlaceId}`);

        if (response.status === 200) {
          setIsvoted(response.data.isvoted);
          setvotesCount(response.data.votesCount);
        } else {
          throw new Error("No se pudo cargar los datos del Enlace");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnlaceData();
  }, [enlaceId]);

  return (
    <div>
      <p>Este es un Enlace</p>
      <button onClick={handlevoteClick} disabled={isLoading}>
        {isLoading ? "Cargando..." : isvoted ? "Unvote" : "vote"} ({votesCount})
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Enlace;
