import React, { useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hyperspeed from './Hyperspeed';
import { ContainerTextFlip } from "./components/ui/container-text-flip";
import HolographicCityScroll from './components/HolographicCityScroll';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Technologies from './Technologies';
import About from './About';
import SolutionsOverview from './Solutions';
import ProjectsPage from './components/ProjectsPage';
import Team from './Team';
import GetInTouch from './GetInTouch';
import Disclosure from './Disclosure';
import { BentoDemo } from './components/ui/bentoDemo';
import RemoteDriving from './Solutions/RemoteDriving';
import DigitalTwin from './Solutions/DigitalTwin';
import MultimodalSimulator from './Solutions/MultimodalSimulator';
import TrafficAnalysisTools from './Solutions/TrafficAnalysisTools';
import Visualisation from './Solutions/Visualisation';
import VRRoadDesign from './Solutions/VRRoadDesign';
import News from './News';
import NewsArticle from './NewsArticle';
import Training from './Training';
import CourseDetail from './components/CourseDetail';
import HeroPrototypeDemo from './HeroPrototypeDemo';

import TawkToWidget from './TawkToWidget';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageContext from './contexts/LanguageContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import ScrollToTop from './components/ScrollToTop';

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
        // {
        //   path: "technologies",
        //   element: <Technologies />
        // },
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
        },
        {
          path: "hero-demo",
          element: <HeroPrototypeDemo />
        }
      ]
    }
  ],
  {
    basename: "/dochakWebsite",
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
      <Outlet />
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


