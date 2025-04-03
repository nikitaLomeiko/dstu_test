import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routing } from "./providers/routing";
import { LayoutApp } from "widgets/layouts/layout-app";
import { useEffect } from "react";
import { filterStore } from "features/review-filter/model";
import { observer } from "mobx-react-lite";

const queryClient = new QueryClient();

const App = observer(() => {
  useEffect(() => {
    filterStore.loadFromLocalStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        <LayoutApp>
          <Routing />
        </LayoutApp>
    </QueryClientProvider>
  );
});

export default App;
