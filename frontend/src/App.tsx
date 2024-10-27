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
      <div className="min-h-dvh h-full w-full bg-slate-600 flex">
        {/* <span>{fetchData && fetchData.map((res) => res.username)}</span> */}
        {/* <div className="bg-orange-300"> */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-40 ml-10 mt-10">
          <p>Add note</p>
          <input placeholder="Name.." {...register("name")} className="my-2" />
          <textarea
            placeholder="Content.."
            {...register("content", { required: true })}
            className="h-60"
          />
          {errors.name && <span>This field is required</span>}

          <button
            className="py-2 px-2 my-2 bg-slate-600 border-solid border"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
