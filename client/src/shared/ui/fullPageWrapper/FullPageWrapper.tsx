import styles from "./FullPageWrapper.module.scss";
import { FullPageWrapperProps } from "./types";

export function FullPageWrapper(props: FullPageWrapperProps): JSX.Element {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
}
