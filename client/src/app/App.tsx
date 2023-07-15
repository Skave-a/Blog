import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getMe } from "@/redux/slices/authSlice";
import AppRouter from "@/app/providers/router/ui/AppRouter";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
};

export default App;
