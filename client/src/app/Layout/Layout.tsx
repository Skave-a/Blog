import { ReactNode } from "react";
import Navbar from "@/widgets/Navbar/Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container mx-auto px-20">
        <Navbar />
        {children}
      </div>
    </>
  );
};
