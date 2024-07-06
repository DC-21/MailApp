import { Route, Routes } from "react-router-dom";
import Mail from "./pages/Mail";
import PageLayout from "./components/layout/Layout";

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
    </Routes>
  );
}

export default App;
