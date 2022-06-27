import Link from 'next/link';

const Page404 = (): JSX.Element => {
  return (
    <div className="flex justify-center flex-col min-h-screen">
      <header className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-full mt-4 mb-8 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-black">Page Not Found</h1>
        </div>
      </header>
      <section className="w-auto md:w-2/5">
        <Link href="/">
          <div className="key-visible flex items-center justify-between py-3 px-4 md:py-4 md:px-6 md:w-auto h-full transition-all duration-75 rounded border border-transparent bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:cursor-pointer">
            <span>Return To Home</span>
            <span className="ml-2 md:ml-4">&rarr;</span>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Page404;
