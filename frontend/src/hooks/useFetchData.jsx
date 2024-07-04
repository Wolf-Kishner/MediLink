import { useEffect, useState } from "react";

const useFetchData = (url, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message + " 😡");
        }
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false here
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetchData;
