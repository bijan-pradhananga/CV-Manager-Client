import { Button } from "../ui/button"

const NotFoundPage = () => {
  return (
    <div><main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="font-semibold text-red-600 text-5xl">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button
          onClick={() => window.history.back()} 
        >
          Go back
        </Button>
      </div>
    </div>
  </main>
  </div>
  )
}

export default NotFoundPage