import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";
import MovieDetailPage from "./pages/MovieDetail";

import { Toaster } from "react-hot-toast"; // ✅ ADD THIS

import "./styles/index.css";
import "./styles/movieDetails.css";

function App() {
  return (
    <>
      <Navbar />

      {/* ✅ TOAST CONTAINER */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
