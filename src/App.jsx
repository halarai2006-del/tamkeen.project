import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Login from './pages/Login/Login'
import Verify from './pages/Verify/Verify'
import Profile from './pages/Profile/Profile'
import Payment from './pages/Payment/Payment'
import Account from './pages/Account/Account'
import Terms from './pages/Terms/Terms'
import ContactUs from './pages/ContactUs/ContactUs'
import Store from './pages/Store/Store'
import Category from './pages/Category/Category'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'

function AppRoutes() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  const handleLoginSubmit = (submittedPhone) => {
    setPhone(submittedPhone)
    navigate('/checkout/verify')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Store
            onProfileClick={() => navigate('/account')}
            onCartClick={() => navigate('/cart')}
            onCategoryClick={() => navigate('/category')}
            onProductClick={() => navigate('/product')}
          />
        }
      />
      <Route
        path="/category"
        element={
          <Category
            onBrandClick={() => navigate('/')}
            onProfileClick={() => navigate('/account')}
            onCartClick={() => navigate('/cart')}
            onProductClick={() => navigate('/product')}
          />
        }
      />
      <Route
        path="/product"
        element={
          <ProductDetail
            onBrandClick={() => navigate('/')}
            onProfileClick={() => navigate('/account')}
            onCartClick={() => navigate('/cart')}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            onBrandClick={() => navigate('/')}
            onProfileClick={() => navigate('/account')}
            onBackToShop={() => navigate('/')}
            onCheckout={() => navigate('/checkout/login')}
          />
        }
      />
      <Route
        path="/checkout/login"
        element={<Login onSubmit={handleLoginSubmit} onClose={() => navigate(-1)} />}
      />
      <Route
        path="/checkout/verify"
        element={
          <Verify
            phone={phone}
            onBack={() => navigate(-1)}
            onSubmit={() => navigate('/checkout/profile')}
          />
        }
      />
      <Route
        path="/checkout/profile"
        element={<Profile onBack={() => navigate(-1)} onSubmit={() => navigate('/payment')} />}
      />
      <Route
        path="/payment"
        element={
          <Payment
            onBrandClick={() => navigate('/')}
            onProfileClick={() => navigate('/account')}
            onBack={() => navigate(-1)}
            onConfirm={() => navigate('/')}
          />
        }
      />
      <Route
        path="/account"
        element={
          <Account
            onBrandClick={() => navigate('/')}
            onCartClick={() => navigate('/cart')}
            onBack={() => navigate(-1)}
            onTermsClick={() => navigate('/account/terms')}
            onContactUsClick={() => navigate('/account/contact')}
          />
        }
      />
      <Route
        path="/account/terms"
        element={
          <Terms
            onBrandClick={() => navigate('/')}
            onBack={() => navigate(-1)}
            onProfileClick={() => navigate('/account')}
            onCartClick={() => navigate('/payment')}
          />
        }
      />
      <Route
        path="/account/contact"
        element={
          <ContactUs
            onBrandClick={() => navigate('/')}
            onBack={() => navigate(-1)}
            onProfileClick={() => navigate('/account')}
            onCartClick={() => navigate('/payment')}
          />
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
