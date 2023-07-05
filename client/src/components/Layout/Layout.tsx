import { Navbar } from "@/components";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </>
  );
};
