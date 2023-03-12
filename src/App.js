import Navbar from './components/navbar/navbar';
import Products from './components/products/products';
import ItemListContainer from './components/navbar/ItemListContainer';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <ItemListContainer greeting={"Bienvenidos a TailBreeze"} />
      <Products />
    </div>
  );
}

export default App;
