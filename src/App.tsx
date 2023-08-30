import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Result from "./pages/Result/Result";
import SearchResultFail from "./pages/SearchResultFail/SearchResultFail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/result/:totalDistance/:totalPassengers/:selectedDate/:destinations"
          element={<Result />}
        />
        <Route path="/fail" element={<SearchResultFail />} />
      </Routes>
    </div>
  );
}

export default App;
