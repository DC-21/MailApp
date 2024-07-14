import { Route, Routes } from "react-router-dom";
import Mail from "./pages/Mail";
import PageLayout from "./components/layout/Layout";
import Compose from "./pages/Compose";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
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
    </>
  );
}

export default App;
