import useAuth from "../hooks/useAuth";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";

export default function Header() {

    const { auth, cerrarSesionAuth } = useAuth()

    const { nombre, rol, imagen } = auth

    return (
        <div className="flex bg-bg-300 justify-between items-center px-8 py-5 border-b border-gray-200">
            <h1 className="text-text-100 font-black text-4xl">Admin</h1>
            <div className="flex items-center gap-4">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <User
                            as="button"
                            avatarProps={{
                            src: imagen || "https://cdn1.iconfinder.com/data/icons/people-avatars-23/24/people_avatar_head_spiderman_marvel_spider_man-512.png",
                            }}
                            className="transition-transform"
                            description={rol}
                            name={nombre}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="settings">
                            My Settings
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={cerrarSesionAuth}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    )
}
