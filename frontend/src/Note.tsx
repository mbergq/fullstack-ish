type Props = { noteName: string; noteContent: string };

function Note({ noteName, noteContent }: Props) {
  const dataName = noteName;
  const dataContent = noteContent;

  return (
    <>
      <p>{dataName && dataName}</p>
      <p>{dataContent && dataContent}</p>
    </>
  );
}

export default Note;
