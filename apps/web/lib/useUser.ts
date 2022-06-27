import { useEffect } from "react";
import Router from "next/router";
import useSWR from 'swr'


interface IUseUser {
  redirectTo: string,
  redirectIfFound: boolean
}

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
}: Partial<IUseUser> = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/user')

  useEffect(() => {
    // if no redirect then return
    if (!redirectTo || !user) return

    if (
      // redirectTo is set, redirect if not found
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }

  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }

}