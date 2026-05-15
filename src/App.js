import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroVideo from './components/HeroVideo';
import LandingIntro from './components/landing/LandingIntro';
import LandingSolutions from './components/landing/LandingSolutions';
import LandingProjects from './components/landing/LandingProjects';
import LandingTraining from './components/landing/LandingTraining';
import LandingAbout from './components/landing/LandingAbout';
import LandingCTA from './components/landing/LandingCTA';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import TawkToWidget from './TawkToWidget';
import { LanguageProvider } from './contexts/LanguageContext';
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
  return (
    <main id="main">
      {/* Hero + Intro share a 300vh sticky stage. The video stays pinned to
          the top of the viewport across all 300vh of scroll while the hero
          text (Smarter cities. Seamless mobility.) scrolls up first, then
          the Intro copy scrolls in and back out, then the video releases. */}
      <div className="hero-intro-stage">
        <div className="hero-intro-stage__bg-pin">
          <HeroVideo render="bg" />
        </div>
        <div className="hero-intro-stage__hero-text">
          <HeroVideo render="fg" />
        </div>
        <div className="hero-intro-stage__intro">
          <LandingIntro />
        </div>
      </div>
      <LandingSolutions />
      <LandingProjects />
      <LandingTraining />
      <LandingAbout />
      <LandingCTA />
    </main>
  );
}

export default App;


