import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import CreateBlog from "./createBlog";
import Home from "./home";
import Navbar from "./Navbar";

function App() {
  return (
    <div style={{ margin: "10px" }}>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="create-blog" element={<CreateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
