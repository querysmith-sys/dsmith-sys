import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { Blog } from "./pages/blog"
import { BlogContent } from "./pages/blog-content"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react"
import { GlobalLoader } from "./components/GlobalLoader"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(5000 - elapsed, 0);

      setTimeout(() => {
        setIsLoading(false);

        setTimeout(() => {
          setShowLoader(false);
        }, 500);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogContent />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {showLoader && (
        <div
          className={`fixed inset-0 z-9999 transition-opacity duration-500 ${
            isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <GlobalLoader />
        </div>
      )}
    </div>
  );
}

export default App
