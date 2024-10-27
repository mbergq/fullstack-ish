import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Note from "./Note";

type Note = { id: number; name: string; content: string }[];

type Inputs = {
  name: string;
  content: string;
};

function App() {
  const [notes, setNotes] = useState<null | Note>(null);

  const fetchData = () => {
    axios.get("api/notes").then((res) => {
      console.log(res.data);

      setNotes(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    axios.post("api/add-note", {
      name: data.name,
      content: data.content,
    });
    fetchData();
  };

  return (
    <>
      <div className="min-h-dvh h-full w-full bg-slate-600 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="w-40">
          <p>Add note</p>
          <input
            placeholder="Name.."
            {...register("name", { required: true })}
            className="my-2"
          />
          <textarea
            placeholder="Content.."
            {...register("content", { required: true })}
            className="h-60"
          />
          {errors.name && <span>This field is required</span>}
          {errors.content && <span>This field is required</span>}
          <button
            className="py-2 px-2 my-2 bg-slate-600 border-solid border text-white"
            type="submit"
          >
            Add note
          </button>
        </form>
        <div className="w-full flex flex-wrap">
          {notes &&
            notes.map((note) => (
              <>
                <Note
                  key={note.id}
                  noteName={note.name}
                  noteContent={note.content}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
