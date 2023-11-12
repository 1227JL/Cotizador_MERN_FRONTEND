import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import { AuthProvider } from "./context/AuthProvider"
import RutaProtegida from "./layouts/RutaProtegida"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import NuevoPassword from "./pages/NuevoPassword"
import Admin from "./pages/Admin/Admin"
import ProductosAdmin from "./pages/Admin/Productos"
import Importaciones from "./pages/Admin/Importaciones"
import Cotizador from "./pages/Admin/Cotizador"
import { ProductoProvider } from "./context/ProductoProvider"
import { CotizadorProvider } from "./context/CotizadorProvider"
import { ImportacionProvider } from "./context/ImportacionProvider"
import Inicio from "./pages/Inicio"
import ShopLayout from "./layouts/ShopLayout"
import { TiendaProvider } from "./context/TiendaProvider"
import Carrito from "./pages/Carrito"
import { CategoriaProvider } from "./context/CategoriaProvider"
import Categorias from "./pages/Admin/Categorias"
import Productos from "./pages/Productos"
import Pedidos from "./pages/Pedidos"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoriaProvider>
          <ProductoProvider>
            <ImportacionProvider>
              <CotizadorProvider>
                <TiendaProvider>
                  <Routes>
                    <Route path='/' element={<AuthLayout/>}>
                      <Route index element={<Login/>}></Route>
                      <Route path='registrar' element={<Registrar/>}></Route>
                      <Route path='olvide-password' element={<OlvidePassword/>}></Route>
                      <Route path='olvide-password/:token' element={<NuevoPassword/>}></Route>
                      <Route path='confirmar/:token' element={<ConfirmarCuenta/>}></Route>
                    </Route>

                    <Route path="/tienda" element={<ShopLayout/>}>
                      <Route index element={<Inicio/>}></Route>
                      <Route path="productos" element={<Productos/>}></Route>
                      <Route path="carrito" element={<Carrito/>}></Route>
                      <Route path="pedidos" element={<Pedidos/>}/>
                    </Route>

                    <Route path='/admin' element={<RutaProtegida/>}>
                      <Route index element={<Admin/>}/>
                      <Route path="productos" element={<ProductosAdmin/>}/>
                      <Route path="importaciones" element={<Importaciones/>}/>
                      <Route path="cotizar-importacion" element={<Cotizador/>}/>
                      <Route path="categorias" element={<Categorias/>}/>
                    </Route>
                  </Routes>
                </TiendaProvider>
              </CotizadorProvider>
            </ImportacionProvider>
          </ProductoProvider>
        </CategoriaProvider>       
      </AuthProvider>
      
    </BrowserRouter>
  )
}

export default App
