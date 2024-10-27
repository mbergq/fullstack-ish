import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Note from "./Note";

type Note = { note_id: number; name: string; content: string }[];

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

  const [notes, setNotes] = useState<null | Note>(null);
  useEffect(() => {
    axios.get("api/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data);
    });
  }, []);
  return (
    <>
      <div className="min-h-dvh h-full w-full bg-slate-600 flex flex-col">
        {/* <span>{fetchData && fetchData.map((res) => res.username)}</span> */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-40">
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
        {notes &&
          notes.map((note) => (
            <>
              <Note noteName={note.name} noteContent={note.content} />
              {/* <div className="w-72 h-48 bg-slate-200">
                <p>{note.name}</p>
                <p>{note.content}</p>
              </div> */}
            </>
          ))}
      </div>
    </>
  );
}

export default App;
