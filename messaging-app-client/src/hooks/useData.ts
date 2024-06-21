import { useState, useEffect } from "react";

interface FetchDataError extends Error {
  status?: number;
}

interface UseDataReturn<T> {
  data: T | null;
  error: FetchDataError | null;
  loading: boolean;
}

export default function useData<T>(
  path: string | null,
  method: string = "GET",
  body: unknown = null
): UseDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<FetchDataError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!path) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000${path}`, {
          mode: "cors",
          method,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: method !== "GET" && body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          const error = new Error("Server error") as FetchDataError;
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as FetchDataError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, method, body]);

  return { data, error, loading };
}
