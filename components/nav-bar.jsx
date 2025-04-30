import Link from 'next/link';
import PhoneNavbar from './phone-navbar';
import { auth, signOut } from '@/auth';

const navigationLinks = [
  { href: "/", label: "Home", ariaCurrent: "page" },
  { href: "/product", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 w-full z-20 sticky top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLogo />
        <div>
          <NavLinks session={session} />
          <NavIcons />
        </div>
      </div>
    </nav>
  );
};

const NavLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img src="/logo.png" className="w-14 h-10 object-cover" />
    </Link>
  );
};

const NavLinks = ({ session }) => {
  return (
    <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
      <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 font-semibold">
        {navigationLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={link.ariaCurrent || undefined}
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {link.label}
            </Link>
          </li>
        ))}

        {session ? (
          <>
            <li>
              <Link
                href="/cart"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Orders
              </Link>
            </li>
            <li>
              <form action={
                async () => {
                  "use server";
                  await signOut({ redirectTo: '/auth/login' });
                }
              }>

                <button type="submit">
                  Logout
                </button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/auth/register"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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

const NavIcons = () => {
  return (
    <div className="flex gap-2 md:gap-0 md:order-2 md:space-x-0 rtl:space-x-reverse">
      <PhoneNavbar />
    </div>
  );
};

export default Navbar;
