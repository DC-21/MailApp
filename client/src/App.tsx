import { Route, Routes } from "react-router-dom";
import Mail from "./pages/Mail";
import PageLayout from "./components/layout/Layout";
import Compose from "./pages/Compose";

function App() {
  return (
    <div className="w-full flex min-screen justify-center items-center bg-slate-100">
      {/* <form
        className="w-1/3 flex flex-col p-4 rounded-xl bg-shite shadow shadow-black"
        action=""
      >
        <p>Welcom Back</p>
        <div className="gap-3 flex flex-col w-full">
          <input
            type="email"
            id="email"
            placeholder="email"
            className="p-3 rounded-lg outline-none text-slate-900"
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="p-3 rounded-lg outline-none text-slate-900"
          />
          <button className="p-3 bg-slate-900 shadow shadow-black text-white rounded-lg">
            Login
          </button>
        </div>
      </form> */}
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
    </div>
  );
}

export default App;
