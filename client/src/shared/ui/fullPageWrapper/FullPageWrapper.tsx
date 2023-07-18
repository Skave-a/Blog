import React from "react";
import styles from "./FullPageWrapper.module.scss";
import { FullPageWrapperProps } from "./types";

export function FullPageWrapper(
  props: FullPageWrapperProps
): React.JSX.Element {
  const { children } = props;

  return <div className={styles.wrapper}>{children}</div>;
}
