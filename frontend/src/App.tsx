import { useState } from "react";
import { useEffect } from "react";
import "./index.css";

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
      <div className="min-h-dvh h-full w-full bg-slate-600">
        <span>{data && data.map((res) => res.username)}</span>
      </div>
    </>
  );
}

export default App;
