import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import ItemListContainer from './components/products/ItemListContainer';
import ItemDetailContainer from './components/products/ItemDetailContainer';
import AddProduct from './components/admin/AddProduct'
import EditProduct from './components/admin/EditProduct'
import Dashboard from './components/admin/Dashboard';
import Wip from './components/admin/WIP';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Register from './components/login/Register';
import { NotificationProvider } from './services/notification/notificationService';
import { CartProvider } from './context/CartContext';
import Checkout from './components/products/Checkout';
import Footer from './components/footer/Footer';
import ProductList from './components/admin/ProductList'


function App() {
  return (
    <div>
      <BrowserRouter>
        <NotificationProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ItemListContainer greeting={"CLC Automation"} />} />
              <Route path="/category/:categoryId" element={<ItemListContainer greeting={'Productos filtrados por categoria'} />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/editproduct/:itemId" element={<EditProduct />} />
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route path="/admin/wip" element={<Wip />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </CartProvider>
        </NotificationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;