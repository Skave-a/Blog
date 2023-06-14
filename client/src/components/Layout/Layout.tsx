import { Navbar } from '@/components';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </>
  );
};
