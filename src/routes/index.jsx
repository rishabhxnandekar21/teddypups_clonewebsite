import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import PuppiesPage from '../pages/PuppiesPage.jsx';
import GoneHomePage from '../pages/GoneHomePage.jsx';
import HappyFamiliesPage from '../pages/HappyFamiliesPage.jsx';
import HowItWorksPage from '../pages/HowItWorksPage.jsx';
import FaqPage from '../pages/FaqPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import PuppyDetailPage from '../pages/PuppyDetailPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'puppies', element: <PuppiesPage /> },
      { path: 'puppies/:slug', element: <PuppyDetailPage /> },
      { path: 'gone-home', element: <GoneHomePage /> },
      { path: 'happy-families', element: <HappyFamiliesPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'visit-and-contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
