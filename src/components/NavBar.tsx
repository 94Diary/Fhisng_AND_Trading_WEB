import React from "react";

const NavBar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white px-6 flex justify-center items-center">
           <ul className="hidden md:flex gap-20">
            <li className="hover:text-gray-200 cursor-pointer text-2xl font-bold">Home</li>
            <li className="hover:text-gray-200 cursor-pointer text-2xl font-bold">WebBoard</li>
            <li className="hover:text-gray-200 cursor-pointer text-2xl font-bold">Gallery</li>
            <li className="hover:text-gray-200 cursor-pointer text-2xl font-bold">Profile</li>
           </ul>
        </nav>
    );
}

export default NavBar;