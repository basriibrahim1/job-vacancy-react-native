import { useState, useEffect } from "react";
import axios from "axios";

const RAPID_KEY = process.env.RAPID_KEY;
const RAPID_HOST = process.env.RAPID_HOST;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "e4081c5f51mshec6d837039812b0p157f98jsn08f4d3e1e38d",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
