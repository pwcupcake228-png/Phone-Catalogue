import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { useAppActions, useAppState } from './store/store';
import { getAccessories, getPhones, getTablets } from './services';
import { useEffect } from 'react';
import { HeaderLayout } from './components/templates/HeaderLayout';
import { ProductItemPage } from './pages/ProductItemPage';
import { CATEGORY } from './constants/category';
import { CatalogPage } from './pages/CatalogPage';
import { supabase } from './services/supabase';
import { CartFlyAnimation } from './components/molecules/CartFlyAnimation/CartFlyAnimation';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from 'react-hot-toast';

export const App: React.FC = () => {
  const {
    loadPhones,
    loadTablets,
    loadAccessories,
    fetchRatings,
    setProductLoadStatus,
  } = useAppActions();
  const { setUser } = useAppActions();
  const userId = useAppState(state => state.user?.id);
  const { syncFavorites, setFavorites } = useAppActions();

  useEffect(() => {
    if (!userId) {
      return;
    }

    void syncFavorites(userId);
  }, [userId, syncFavorites]);

  useEffect(() => {
    setProductLoadStatus('phones', 'loading');
    getPhones()
      .then(data => {
        loadPhones(data);
        setProductLoadStatus('phones', 'success');
      })
      .catch(() => setProductLoadStatus('phones', 'error'));

    setProductLoadStatus('tablets', 'loading');
    getTablets()
      .then(data => {
        loadTablets(data);
        setProductLoadStatus('tablets', 'success');
      })
      .catch(() => setProductLoadStatus('tablets', 'error'));

    setProductLoadStatus('accessories', 'loading');
    getAccessories()
      .then(data => {
        loadAccessories(data);
        setProductLoadStatus('accessories', 'success');
      })
      .catch(() => setProductLoadStatus('accessories', 'error'));

    fetchRatings();
  }, [
    loadAccessories,
    loadPhones,
    loadTablets,
    setProductLoadStatus,
    fetchRatings,
  ]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (event === 'SIGNED_OUT') {
        setFavorites([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setFavorites]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route path="contacts" element={<ContactPage />} />
          <Route index element={<HomePage />} />
          <Route
            path="phones"
            element={
              <CatalogPage key={CATEGORY.PHONES} category={CATEGORY.PHONES} />
            }
          />
          <Route
            path="phones/:productId"
            element={<ProductItemPage category={CATEGORY.PHONES} />}
          />
          <Route
            path="tablets"
            element={
              <CatalogPage key={CATEGORY.TABLETS} category={CATEGORY.TABLETS} />
            }
          />
          <Route
            path="tablets/:productId"
            element={<ProductItemPage category={CATEGORY.TABLETS} />}
          />
          <Route
            path="accessories"
            element={
              <CatalogPage
                key={CATEGORY.ACCESSORIES}
                category={CATEGORY.ACCESSORIES}
              />
            }
          />
          <Route
            path="accessories/:productId"
            element={<ProductItemPage category={CATEGORY.ACCESSORIES} />}
          />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="bag" element={<CartPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <CartFlyAnimation />
      <Toaster
        toastOptions={{
          className: 'w-4/5 text-sm',
        }}
      />
    </>
  );
};

export default App;
