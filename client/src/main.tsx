import App from "./app/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ErrorBoundary } from "./app/providers/ErrorBoundary";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
);
