import styles from "../styles/loading.module.css";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-mainDarkBlue">
      <img src="/pe-icon.png" alt="pe-icon" className="w-56 h-56 " />
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

{
  /* <div className="flex flex-col justify-center items-center h-screen bg-mainDarkBlue">
      <img src="/pe-icon.png" alt="pe-icon" className="w-56 h-56 " />
      <div className=" -mt-8  w-20 h-20 border-4 border-white border-solid rounded-full border-t-transparent animate-spin" />
    </div> */
}