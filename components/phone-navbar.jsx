'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { signOut  } from "next-auth/react";
const PhoneNavbar = () => {
    const {data:session} = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <HamButton toggleMenu={toggleMenu} />
            <PhoneNavLink session={session} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>

    )
}

const HamButton = ({ toggleMenu }) => {
    return (
        <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            onClick={toggleMenu}
        >
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </svg>
        </button>
    )
}

const PhoneNavLink = ({ isMenuOpen, toggleMenu, session }) => {
    const navigationLinks = [
        { href: "/", label: "Home", ariaCurrent: "page" },
        { href: "/product", label: "Products" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <div
            className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 z-30 transition-transform duration-500 ease-in-out`}
        >
            {/* Close Button (X) */}
            <button
                type="button"
                className="absolute top-5 right-5 text-black dark:text-white w-10 h-10 flex justify-center items-center rounded hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={toggleMenu}
            >
                <span className="sr-only">Close menu</span>
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <ul className="flex flex-col justify-center items-center h-full space-y-8 dark:text-white text-2xl font-semibold">
                {navigationLinks.map((link) => (
                    <li key={link.href} onClick={toggleMenu}>
                        <Link
                            href={link.href}
                            className="hover:text-blue-500 transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}

                {session ? (
                    <>
                        <li onClick={toggleMenu}>
                            <Link
                                href="/cart"
                                className="hover:text-blue-500 transition-colors duration-300"
                            >
                                Cart
                            </Link>
                        </li>
                        <li onClick={toggleMenu}>
                            <Link
                                href="/orders"
                                className="hover:text-blue-500 transition-colors duration-300"
                            >
                                Orders
                            </Link>
                        </li>
                        <li>
    
                                <button  onClick={() => signOut({redirectTo:'/auth/login'})}
                                    type="submit"
                                    className="hover:text-blue-500 transition-colors duration-300"
                                >
                                    Logout
                                </button>
                            
                        </li>
                    </>
                ) : (
                    <>
                        <li onClick={toggleMenu}>
                            <Link
                                href="/auth/register"
                                className="hover:text-blue-500 transition-colors duration-300"
                            >
                                Register
                            </Link>
                        </li>
                        <li onClick={toggleMenu}>
                            <Link
                                href="/auth/login"
                                className="hover:text-blue-500 transition-colors duration-300"
                            >
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};


export default PhoneNavbar