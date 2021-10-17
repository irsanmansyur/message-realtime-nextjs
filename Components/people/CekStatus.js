import { useEffect, useState } from "react";
import { OnlineChannel } from "../../Utils/Pusher";
import { userRefreshUtils } from "../../Utils/User";

const CekStatus = ({ last_online, lastActivity }) => {
  const last_activity = new Date(lastActivity);
  const current_time = new Date();
  const totalSeconds = parseInt(Math.floor((current_time - (last_activity)) / 1000));
  let totalTimeLogin = 60 * 1;
  const [timeLeft, setTimeLeft] = useState(totalSeconds > totalTimeLogin ? 0 : totalTimeLogin - totalSeconds);
  useEffect(() => {
    if (timeLeft > 0) {
      let b = timeLeft;
      const intervalId = setInterval(() => {
        setTimeLeft((t) => t - 1);
        if (b-- && b <= 0)
          clearInterval(intervalId);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  useEffect(() => {
    const last_activity = new Date(lastActivity);
    const current_time = new Date();
    const totalSeconds = parseInt(Math.floor((current_time - (last_activity)) / 1000));
    let totalTimeLogin = 60 * 1;
    setTimeLeft(totalSeconds > totalTimeLogin ? 0 : totalTimeLogin - totalSeconds);
  }, [lastActivity]);

  return (
    <div className="flex flex-col text-right text-sm md:text-base px-3">
      {timeLeft > 0 ?
        <>
          <div className="flex items-center justify-end">
            <span className="mr-2 inline-block rounded-full w-2 h-2 bg-green-600 right-0 top-4 animate-ping" />
            <span className="sm:mt-[3px] text-green-600 font-bold"> Online</span>
          </div>
        </>
        :
        <>
          <div className="flex items-center justify-end">
            <span className="mr-2 inline-block rounded-full w-2 h-2 bg-red-500 right-0 top-4"></span>
            <span className="text-gray-400 font-bold"> Offline</span>
          </div>
          <span className="sm:mt-[3px] text-gray-500">{last_online}</span>
        </>}
    </div>
  );
};

export default CekStatus;