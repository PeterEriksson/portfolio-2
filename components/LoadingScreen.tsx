import styles from "../styles/loading.module.css";

function LoadingScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-mainDarkBlue">
      <h1
        className={`text-8xl xs:text-9xl font-bold tracking-[2px] mb-4 flex items-center text-white`}
      >
        PE
        <span
          className={`w-[18px] h-[18px] xs:w-[22px] xs:h-[22px] bg-react bg-red-500// inline-block rounded-full ml-[18px] `}
        ></span>
      </h1>
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
