
function Sum({ val, onClick }) {
  function handleAdd() {
    onClick(val + 1);
  }
  function handleSub() {
    onClick(val - 1);
  }

  return (
    <div className="flex justify-center items-center flex-row gap-10 mt-20">
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSub}>Sub</button>
      <p>{val}</p>
    </div>
  );
}

export default Sum;
