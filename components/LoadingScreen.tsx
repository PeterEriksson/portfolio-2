import styles from "../styles/loading.module.css";

function LoadingScreen() {
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

export default LoadingScreen;
