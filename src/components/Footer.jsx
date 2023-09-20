export const Footer = () => {

    return (
        <nav className="footer w-full p-3 text-center border-t border-gray-400">
            <ul className="flex grid-cols-4 justify-center gap-6">
                <li className="cursor-pointer">All</li>
                <li className="cursor-pointer">Coffee</li>
                <li className="cursor-pointer">Snacks</li>
                <li className="cursor-pointer">Desserts</li>
            </ul>
        </nav>
    )
}