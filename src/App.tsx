import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { Blog } from "./pages/blog"
import { BlogContent } from "./pages/blog-content"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react"
import { GlobalLoader } from "./components/GlobalLoader"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const timeout = setTimeout(() => {
      handleLoad()
    }, 5000)

     return () => clearTimeout(timeout);

  }, []);

  return (
    <>
      {isLoading ? <GlobalLoader/> : (
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogContent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      )}
      
    </>
  );
}

export default App
