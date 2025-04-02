import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routing } from "./providers/routing";
import { LayoutApp } from "widgets/layouts/layout-app";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutApp>
        <Routing />
      </LayoutApp>
    </QueryClientProvider>
  );
}

export default App;
