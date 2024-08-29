'use client'

import { useRouter } from 'next/navigation';

export const NavigationButton = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};