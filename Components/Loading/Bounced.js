import styles from './Bounced.module.css'
const Bounced = () => {
  return (
    <div className="flex justify-center">
      <div className={styles.blue + " bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce mr-[3px]"} />
      <div className={styles.green + " bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce mr-[3px]"} />
      <div className={styles.red + " bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce"} />
    </div>
  );
};

export default Bounced;