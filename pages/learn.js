import { useEffect, useState } from "react";

const learn = () => {
  const [times, setTimes] = useState(5);
  useEffect(() => {
    const timesAktif = setInterval(() => {
      setTimes(times - 1)
      console.log(times);
    }, 1000)

  }, []);
  return (
    <div>
      {times}
    </div>
  );
};

export default learn;