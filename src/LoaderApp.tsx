import React, { useEffect, useState } from 'react';
import { checkApiStatus } from './api/api';

const REFRESH_TIME = 2000;

type Props = {
  fallback: JSX.Element;
  children?: JSX.Element;
  checkUrl?: string;
};
export function LoaderApp({ fallback, children, checkUrl }: Props) {
  const [ready, setReady] = useState(false);
  let intervalId: number;
  useEffect(() => {
    if (!ready) {
      intervalId = setInterval(() => {
        checkApiStatus().then(setReady);
      }, REFRESH_TIME);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [ready]);
  if (ready) return children || null;
  return fallback;
}
