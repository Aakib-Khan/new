import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SignUp from "./component/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import PrivateComponent from './component/privateComponent'
import Login from "./component/Login";
import AddProduct from "./component/AddProduct";
import ProductList from "./component/Product.List";
import UpdateProduct from "./component/UpdateProduct";
import Profile from "./component/Profile";
// import 
function App() {

  return (
    <div>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={ <UpdateProduct/>  } />
            <Route path="/logout" element={<h1>logout  component</h1>} />
            <Route path="/profile" element={ <Profile /> } />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  )



}



export default App;

