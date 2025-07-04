import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-3/5 relative bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Real Estate"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="fixed z-10 p-10 text-white bg-opacity-70">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Empower Rural Communities <br /> through Data-Driven Farming
          </h2>
          <p className="text-lg max-w-xl">
            Join Reaching Roots in Transforming Villages through Smart
            Agriculture, Climate Resilience, and Entrepreneurial Upliftment.
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-6">
        <div className="max-w-md w-full">
          <SignUp forceRedirectUrl={"/"} />
        </div>
      </div>
    </div>
  );
}
