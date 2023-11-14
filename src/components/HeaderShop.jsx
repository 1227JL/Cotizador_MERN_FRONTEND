import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth";

export default function HeaderShop() {

  const { auth, cerrarSesionAuth } = useAuth()

  const menuItems = [
    {name: "Productos", href:'productos'},
    {name: "Carrito de compras", href:'carrito'},
    {name: "Mis pedidos", href:'pedidos'},
  ];

  const location = useLocation()
  const { pathname } = location
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  
  return (
    <Navbar disableAnimation isBordered isMenuOpen={menuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle onClick={()=>setMenuOpen(!menuOpen)}/>
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link to={'/tienda'} className="text-inherit text-2xl font-black">Tienda</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link to={'/tienda'} className={`${pathname === '/tienda' ? 'font-bold' : 'font-normal'}`} color={pathname == '/tienda' ? 'warning' : 'foreground'}>
            Tienda
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link to={'/tienda/productos'} className={`${pathname.includes('productos') ? 'font-bold' : 'font-normal'}`} color={pathname.includes('/productos') ? 'warning' : 'foreground'}>
            Productos
          </Link>
        </NavbarItem>
        {Object.keys(auth).length > 0 && (
          <NavbarItem isActive>
            <Link to={'/tienda/pedidos'} aria-current="page" className={`${pathname.includes('pedidos') ? 'font-bold' : 'font-normal'}`} color={pathname.includes('/pedidos') ? 'warning' : 'foreground'}>
              Mis pedidos
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <Link to={'#integrations'} className={`${pathname.includes('#') ? 'font-bold' : 'font-normal'}`} color={pathname.includes('/#') ? 'warning' : 'foreground'}>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
          <Link to={'/tienda/carrito'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </Link>
        {Object.keys(auth).length > 0 ? (
          <Dropdown placement="bottom-start">
            <DropdownTrigger className="cursor-pointer hidden sm:block">
              <h1>Hola! {auth.nombre}</h1>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="settings">
                    Mi perfil
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={cerrarSesionAuth}>
                    Cerrar Sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        ): (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" to="/registrar" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`${ index === 2 ? "text-warning-400" : index === menuItems.length - 1 ? "text-danger-400" : "text-foreground"}`}
              to={`/tienda/${item.href}`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link className="text-danger-400" onClick={cerrarSesionAuth}>Cerrar Sesión</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

    <header className='flex justify-between items-center p-5 shadow-md'>
      <h1 className='text-text-100 font-black text-4xl'>Tienda</h1>
      <nav>
          <ul>
              <Link to={'/tienda/carrito'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </Link>
          </ul>
      </nav>
    </header>