type Props = { noteName: string; noteContent: string };

function Note({ noteName, noteContent }: Props) {
  const name = noteName;
  const content = noteContent;

  return (
    <>
      <div className="bg-slate-300 w-64 h-64 my-2 mx-2">
        <p className="border-b border-black">{name && name}</p>
        <p>{content && content}</p>
      </div>
    </>
  );
}

export default Note;
