import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../gql/graphql';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  // == componentDidmount
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/login?next=' + router.pathname);
      
    }
    // Only re-run the effect if data or router changes
  }, [data, router]);
};
