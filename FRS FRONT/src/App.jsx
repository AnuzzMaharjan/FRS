import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageRoutes from "./Routes/PageRoutes";

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App
