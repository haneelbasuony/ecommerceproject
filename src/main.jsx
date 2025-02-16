import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'flowbite/dist/flowbite.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UsertTokenProvider from './Context/UserToken.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import NumItemContextProvider from './Context/NumCartContext.jsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <NumItemContextProvider>
    <QueryClientProvider client={queryClient}>
      <UsertTokenProvider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        <Toaster></Toaster>
        <App />
      </UsertTokenProvider>
    </QueryClientProvider>
  </NumItemContextProvider>
);
