const InputText = ({ name, label, id, value = '', error = false, isInput, type = "text", auto_complete = false }) => {

  return (
    <div className="mb-4">
      <label className={`block text-gray-700 text-sm font-bold mb-2 ${error && 'text-red-500'}`} htmlFor="name"> {label} </label>
      <input className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && "border-red-500 text-red-500"}`} id={id ?? name} name={name} onChange={isInput} value={value} type={type} autoComplete={auto_complete ? "none" : ''} />
      {error && <small className="text-red-500 italic">{error[0]}</small>}
    </div>
  );
};

export default InputText;