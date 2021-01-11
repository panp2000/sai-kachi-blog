import React, { ReactNode } from 'react';

type INavbarProps = {
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <ul className="flex flex-wrap text-xl navbar justify-items-auto">
    {props.children}

    <style jsx>
      {`
        .navbar :global(a) {
          @apply text-gray-700;
        }

        .navbar :global(a:hover) {
          @apply no-underline text-gray-900;
        }
      `}
    </style>
  </ul>
);

export { Navbar };
