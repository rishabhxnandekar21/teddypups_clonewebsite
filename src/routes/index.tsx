import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import HomePage from '../pages/HomePage';
import PuppiesPage from '../pages/PuppiesPage';
import GoneHomePage from '../pages/GoneHomePage';
import HappyFamiliesPage from '../pages/HappyFamiliesPage';
import HowItWorksPage from '../pages/HowItWorksPage';
import FaqPage from '../pages/FaqPage';
import ContactPage from '../pages/ContactPage';
import PuppyDetailPage from '../pages/PuppyDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
