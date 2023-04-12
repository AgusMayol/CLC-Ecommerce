import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import ItemListContainer from './components/products/ItemListContainer';
import ItemDetailContainer from './components/products/ItemDetailContainer';
import AddProduct from './components/admin/AddProduct'
import Dashboard from './components/admin/Dashboard';
import Wip from './components/admin/WIP';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Register from './components/login/Register';
import { NotificationProvider } from './services/notification/notificationService';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NotificationProvider>
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
            <Route path="/admin/wip" element={<Wip />} />
          </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;