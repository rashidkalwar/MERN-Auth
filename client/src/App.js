import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Loading from './Components/loading';

const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
const Home = lazy(() => import('./Pages/Home'));

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </MantineProvider>
  );
}

export default App;
