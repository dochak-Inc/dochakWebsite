import React, { useEffect, useContext, lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HolographicCityScroll from './components/HolographicCityScroll';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import TawkToWidget from './TawkToWidget';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import ScrollToTop from './components/ScrollToTop';
import LoadingFallback from './components/LoadingFallback';

// Lazy load all route components for better performance
const About = lazy(() => import('./About'));
const SolutionsOverview = lazy(() => import('./Solutions'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const Team = lazy(() => import('./Team'));
const GetInTouch = lazy(() => import('./GetInTouch'));
const Disclosure = lazy(() => import('./Disclosure'));
const RemoteDriving = lazy(() => import('./Solutions/RemoteDriving'));
const DigitalTwin = lazy(() => import('./Solutions/DigitalTwin'));
const MultimodalSimulator = lazy(() => import('./Solutions/MultimodalSimulator'));
const TrafficAnalysisTools = lazy(() => import('./Solutions/TrafficAnalysisTools'));
const Visualisation = lazy(() => import('./Solutions/Visualisation'));
const VRRoadDesign = lazy(() => import('./Solutions/VRRoadDesign'));
const News = lazy(() => import('./News'));
const NewsArticle = lazy(() => import('./NewsArticle'));
const Training = lazy(() => import('./Training'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "solutions",
          element: <SolutionsOverview />
        },
        {
          path: "solutions/remote-driving",
          element: <RemoteDriving />
        },
        {
          path: "solutions/digital-twin",
          element: <DigitalTwin />
        },
        {
          path: "solutions/multimodal-simulator",
          element: <MultimodalSimulator />
        },
        {
          path: "solutions/traffic-analysis-tools",
          element: <TrafficAnalysisTools />
        },
        {
          path: "solutions/visualization",
          element: <Visualisation />
        },
        {
          path: "solutions/vr-road-design",
          element: <VRRoadDesign />
        },
        {
          path: "projects",
          element: <ProjectsPage />
        },
        {
          path: "team",
          element: <Team />
        },
        {
          path: "news",
          element: <News />
        },
        {
          path: "news/:slug",
          element: <NewsArticle />
        },
        {
          path: "training",
          element: <Training />
        },
        {
          path: "training/:courseCode",
          element: <CourseDetail />
        },
        {
          path: "disclosure",
          element: <Disclosure />
        },
        {
          path: "disclosure/:section",
          element: <Disclosure />
        },
        {
          path: "get-in-touch",
          element: <GetInTouch />
        }
      ]
    }
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
  );

  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

function Layout() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
      <Footer />
      <TawkToWidget />
    </div>
  );
}

function HomePage() {
  const { t } = useContext(LanguageContext);
  
  // Animation component for individual elements
  const AnimatedElement = ({ children, animation = 'slide-up', delay = 0, className = '' }) => {
    const { elementRef, isVisible } = useScrollAnimation({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <div
        ref={elementRef}
        className={`animate-on-scroll ${animation} ${isVisible ? 'visible' : ''} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  };
  
  return (
    <main>
      {/* Section 1: Holographic City Hero */}
      <HolographicCityScroll />
    </main>
  );
}

export default App;


