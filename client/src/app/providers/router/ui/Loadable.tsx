import React, { ElementType, Suspense } from "react";
import { FullPageWrapper, Spinner } from "@/shared/ui";

type Props = {
  [key: string]: {};
};

type LoadableComponent = React.FC<Props>;

export const Loadable = (Component: ElementType): LoadableComponent =>
  function LoadableComponentWrapper(props: Props) {
    return (
      <Suspense
        fallback={
          <FullPageWrapper>
            <Spinner />
          </FullPageWrapper>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
