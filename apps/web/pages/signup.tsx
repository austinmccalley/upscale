import { supabase } from '../lib/initSupabase';
import { SubmitHandler, useForm } from 'react-hook-form';
import { sign, verify } from '../lib/jwt';
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
      .signUp(
        {
          email: data.email,
          password: data.password,
        },
        {
          data: {
            plan: data.plan,
            fName: data.firstName,
            lName: data.lastName,
          },
        }
      )
      .then(({ user, error, session }) => {
        if (error) {
          console.error(error);
          return;
        }

        if (user && !session) {
          // We are successful at creating the user, waiting for email verification
          setNextStep(true);
        }
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
        <h1>Sign Up</h1>
        <Link href="/">
          <h5 className="text-white text-md pt-3 hover:cursor-pointer underline">
            Home
          </h5>
        </Link>
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-sm md:w-auto">
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
                className="bg-[#242424] shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
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

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    autoComplete="new-password"
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

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type={'text'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('firstName', { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs italic">
                      Please provide your first name
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type={'test'}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register('lastName', { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                      Please provide your last name
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="plan"
                  >
                    Plan
                  </label>
                  <select
                    {...register('plan', { required: true })}
                    id="plan"
                    className="w-full shadow border rounded leading-right py-2 px-3"
                  >
                    <option value={'basic'}>Basic</option>
                    <option value={'premium'}>Premium</option>
                  </select>
                  {errors.plan && (
                    <p className="text-red-500 text-xs italic">
                      Please select a plan
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
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
