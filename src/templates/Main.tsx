import React, { ReactNode } from 'react';

import Link from 'next/link';

// import { Navbar } from '../navigation/Navbar';
import { Config } from '../utils/Config';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-11/12 mx-auto antialiased text-gray-700">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-semibold text-gray-900">
            <Link href="/">
              <a className="text-gray-900 no-underline hover:no-underline">{Config.title}</a>
            </Link>
          </div>
          <div className="text-xl">{Config.description}</div>
        </div>
        {/* <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                <a>About</a>
              </Link>
            </li>
          </Navbar>
        </div> */}
      </div>

      <div className="py-5 text-xl">{props.children}</div>

      <div className="py-8 text-sm text-center border-t border-gray-300">
        © Copyright
        {new Date().getFullYear()}
        {Config.title}
        . Powered with
        {' '}
        <span role="img" aria-label="Love">
          ♥
        </span>
        {' '}
        by
        <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
);

export { Main };
