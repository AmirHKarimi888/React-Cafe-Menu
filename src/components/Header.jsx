export const Header = (props) => {

    return (
        <nav className="w-full text-center border-b border-gray-400 p-2 grid grid-cols-1 justify-center items-center">
            <ul className="mx-auto flex grid-cols-4 justify-center gap-3">
                <li onClick={props.setTypeAll} id="all" className="cursor-pointer p-2">All</li>
                <li onClick={props.setTypeCoffee} id="coffee" className="cursor-pointer p-2">Coffee</li>
                <li onClick={props.setTypeSnack} id="snacks" className="cursor-pointer p-2">Snacks</li>
                <li onClick={props.setTypeDessert} id="dessert" className="cursor-pointer p-2">Desserts</li>
                <li onClick={props.toggleAdminModal} className="cursor-pointer p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg">
                    Admin
                </li>
            </ul>
        </nav>
    )
}