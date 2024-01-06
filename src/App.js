import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './page/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './page/Dashboard';
import Customer from './page/Customer';
import CartList from './page/Cart/CartList';
import ProductList from './page/Product/ProductList';
import ProductItemList from './page/Product/ProductItemList';
import CategoryList from './page/Category/CategoryList';
import Order from './page/Order/Order';
import AddCategory from './page/Category/AddCategory';
import AddProduct from './page/Product/AddProduct';
import AddProductItem from './page/Product/AddProductItem';
import AddImage from './page/Image/AddImage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToken } from './redux/slice/auth/authSlice';

function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., has a token)
    const token = localStorage.getItem('token');
    if (token) {
      // If the user has a token, set it in the Redux state
      dispatch(setToken(token));
    }
  }, [dispatch]);


  return (

    <Router>
      {isAuthenticated &&
        <MainLayout>
          <Routes>
            <Route path='/' element={<Dashboard />} />
           
              <Route path='customer' element={<Customer />} />
              <Route path='user-cart' element={<CartList />} />
              <Route path='product-list' element={<ProductList />} />
              <Route path='product-item-list' element={<ProductItemList />} />
              <Route path='category-list' element={<CategoryList />} />
              <Route path='order' element={<Order />} />
              <Route path='category' element={<AddCategory />} />
              <Route path='product' element={<AddProduct />} />
              <Route path='product-item' element={<AddProductItem />} />
              <Route path='image' element={<AddImage />} />
            {/* <Route path='/admin' element={<MainLayout />}>
              

            </Route> */}
          </Routes>
        </MainLayout>

      }

      {!isAuthenticated &&
        <Routes>
          <Route path='*' element={<Login />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      }

    </Router>
  );
}

export default App;
