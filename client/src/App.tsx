import { Route, Routes } from "react-router-dom";
import Mail from "./pages/Mail";
import PageLayout from "./components/layout/Layout";
import Compose from "./pages/Compose";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <Mail />
          </PageLayout>
        }
      />
      <Route
        path="/compose"
        element={
          <PageLayout>
            <Compose />
          </PageLayout>
        }
      />
    </Routes>
  );
}

export default App;
