import { Suspense, lazy } from 'react';
import NavBar from './NavBar';
import Loading from '../assets/loading.gif';

const LazyProductList = lazy(() => import('../components/productList'));

const Home = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<img src={Loading} alt="loading" />}>
        <LazyProductList />
      </Suspense>
    </>
  );
};

export default Home;
