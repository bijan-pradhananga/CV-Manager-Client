import { companyName } from '@/app/(client)/info';
import Link from 'next/link'
const currentYear = new Date().getFullYear();

const FooterComponent = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10 border-t-2 border-gray-300 dark:border-black">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {companyName}
              </span>
              <img src="/logo.png" className="w-14 h-10 object-cover" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {companyName}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="product" className="hover:underline">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Profile
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="cart" className="hover:underline">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link href="orders" className="hover:underline">
                    Orders
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear}{" "}
            <a href="#" className="hover:underline">
              {companyName}
            </a>
            . All Rights Reserved.
          </span>

        </div>
      </div>
    </footer>

  )
}

export default FooterComponent