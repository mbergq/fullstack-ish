import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";

type User = { userId: number; username: string }[];

function App() {
  const [fetchData, setFetchData] = useState<null | User>(null);
  useEffect(() => {
    axios.get("api/users").then((res) => {
      console.log(res.data);
      setFetchData(res.data);
    });
  }, []);
  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);

  //       setData(result);
  //     });
  // }, []);
  return (
    <>
      <div className="min-h-dvh h-full w-full bg-slate-600">
        <span>{fetchData && fetchData.map((res) => res.username)}</span>
      </div>
    </>
  );
}

export default App;
