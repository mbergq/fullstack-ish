import { useState } from "react";
import { useEffect } from "react";
// import "./App.css";

type User = { userId: number; username: string }[];

function App() {
  const [data, setData] = useState<null | User>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setData(result);
      });
  }, []);
  return (
    <>
      <h2>{data && data.map((res) => res.username)}</h2>
    </>
  );
}

export default App;
