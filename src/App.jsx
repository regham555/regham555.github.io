import { useEffect } from 'react'
import {
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Blog from './pages/Blog.jsx'
import Post from './pages/Post.jsx'
import Contact from './pages/Contact.jsx'

function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="shell">
      <header className="top">
        <NavLink to="/" className="mark" end>
          Ram Ghimire
        </NavLink>
        <div className="top-right">
          <nav className="tabs" aria-label="Primary">
            <a
              className="tab"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
            <NavLink to="/projects" className="tab">
              Work
            </NavLink>
            <NavLink to="/blog" className="tab">
              Blog
            </NavLink>
            <NavLink to="/contact" className="tab">
              Contact
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main>
        <div className="page-frame" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
