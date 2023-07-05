import { ElementType, Suspense } from "react";
import { FullPageWrapper } from "@/shared/ui/fullPageWrapper/FullPageWrapper";
import { Spinner } from "@/shared/ui/spinner";

export const Loadable = (Component: ElementType) =>
  function fn(props: any) {
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
