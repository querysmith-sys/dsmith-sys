import { Layout } from "./components/layout"
import { Home } from "./pages/home"
import { Blog } from "./pages/blog"
import { BlogContent } from "./pages/blog-content"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
