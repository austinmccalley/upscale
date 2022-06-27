import { List } from 'ui';

import Image from 'next/image';
import Head from 'next/head';

import home from '../assets/img/home.svg';
import MyLink from '../components/MyLink';

const list = [
  {
    title: 'Log In',
    href: '/login',
  },
  {
    title: 'Sign Up',
    href: '/signUp',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'About',
    href: '/about',
  },
];

const Web = () => {
  return (
    <>
      <Head>
        <title>Upscale</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center flex-col min-h-screen">
        <header className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="w-full mt-4 mb-8 md:mt-0">
            <h1 className="text-4xl md:text-6xl font-black">
              Upscale Your{' '}
              <span className="bg-gradient-to-r text-transparent bg-clip-text from-rose-500 to-violet-500">
                Images
              </span>
            </h1>
          </div>
          <figure className="flex items-center justify-center w-full">
            <Image
              className="w-60 md:w-96 aspect-auto"
              src={home}
              alt="illustration"
            />
          </figure>
        </header>

        <section className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between w-full">
          <div className="w-full md:w-auto">
            <h2>Get Started</h2>
            <ul className="mt-2 md:mt-4 w-full space-y-2 md:space-y-3">
              {list.map((item, idx) => (
                <List key={item.title + idx}>
                  <MyLink
                    href={item.href}
                    className="key-visible flex items-center justify-between py-3 px-4 md:py-4 md:px-6 w-full h-full transition-all duration-75 rounded border border-transparent bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  >
                    <span>{item.title}</span>

                    <span className="ml-2 md:ml-4">&rarr;</span>
                  </MyLink>
                </List>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Web;
