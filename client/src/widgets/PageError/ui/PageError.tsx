import styles from "./PageError.module.scss";
const PageError = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={styles.ErrorPage}>
      <button onClick={reloadPage}>Обновить страницу</button>
    </div>
  );
};

export default PageError;
