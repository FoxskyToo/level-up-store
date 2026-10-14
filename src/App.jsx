
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1 w-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
