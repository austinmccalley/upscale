import { supabase } from '../lib/initSupabase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

enum PlanEnum {
  basic = 'Basic',
  premium = 'Premium',
}

type Inputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  plan: PlanEnum;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const [nextStep, setNextStep] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    supabase.auth
      .signIn({
        email: data.email,
        password: data.password,
      })
      .then(({ user, error, session }) => {
        if (error) {
          console.error(error);
          return;
        }
        // Redirect to /profile
        router.push('/profile');
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    try {
      const session = supabase.auth.session();
      if (session) {
        router.push('/profile');
      }
    } catch (err) {
      console.log(err);
    }
  }, [router]);

  return (
    <div className="h-screen justify-center flex w-full">
      <div className="w-3/5 pt-8">
        <h1>Log In</h1>
        <Link href="/">
          <h5 className="text-white text-md hover:cursor-pointer">
            {'<'} Home
          </h5>
        </Link>
        <div className="flex items-center justify-center h-full w-3/4">
          <div className="w-full">
            {nextStep ? (
              <div className="rounded shadow-md bg-[#242424] px-8 pt-6 pb-8">
                <h2>Next Step</h2>
                <span className="font-primary text-white pt-2">
                  Please check your email to verify your account
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#242424] shadow-md rounded px-14 pt-10 pb-4"
              >
                <div className="mb-5">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    placeholder="austin@upscale.com"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      Please provide an email
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    autoComplete="password"
                    type={'password'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('password', {
                      required: true,
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      Please provide a password
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center h-full">
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Log In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
