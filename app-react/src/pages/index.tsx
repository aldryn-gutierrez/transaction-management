import { GetStaticProps, GetStaticPropsResult } from 'next';
import { Params } from 'next/dist/server/router';
import React, { ReactElement } from 'react';

export const HomePage = (): ReactElement => {
  return <div>Hellos World</div>
}

export function getStaticProps(): GetStaticPropsResult<Params> {
  return {
    props: {},
  };
}

export default HomePage;