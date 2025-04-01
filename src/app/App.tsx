import { QueryClient, QueryClientProvider } from "react-query";
import { LayoutApp } from "widgets/layouts/layout-app";
import { Routing } from "./providers/routing";
import "./styles/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutApp>
        <Routing />
      </LayoutApp>
    </QueryClientProvider>
  );
}

export default App;
