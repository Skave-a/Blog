import styles from "./spinner.module.css";

export function Spinner(): React.JSX.Element {
  return (
    <div className={styles["lds-ring"]}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
