import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
type User = { userId: number; username: string }[];

type Inputs = {
  name: string;
  content: string;
};

function App() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    axios.post("api/add-note", {
      name: data.name,
      content: data.content,
    });
  };

  const [fetchData, setFetchData] = useState<null | User>(null);
  useEffect(() => {
    axios.get("api/users").then((res) => {
      console.log(res.data);
      setFetchData(res.data);
    });
  }, []);
  return (
    <>
      <div className="min-h-dvh h-full w-full bg-slate-600">
        <span>{fetchData && fetchData.map((res) => res.username)}</span>
        <div className="h-60 w-60 bg-orange-300">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="" {...register("name")} />
            <input {...register("content", { required: true })} />
            {errors.name && <span>This field is required</span>}

            <input className="p-10 bg-slate-600" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
