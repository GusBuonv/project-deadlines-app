import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import DefaultLayout from '../layouts/default-layout';
import * as homeContent from '../assets/home-content.json';
import Project from '../components/project/project';

//
// Styles
//

const H1 = styled.h1`
  margin-bottom: 5rem;

  text-align: center;
  line-height: 1.15;
  font-size: 4rem;
  font-weight: 700;
`;

//
// Page Component
//

type HomeProps = {
  title: string,
  description: string,
  favicon: string,
};

const Home = ({
  title,
  description,
  favicon,
}: HomeProps): ReactElement => (
  <DefaultLayout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex" />
      <link rel="icon" href={favicon} />
    </Head>

    <H1>{title}</H1>
    <Project
      title="My Project"
      deadline={(new Date(2021, 6, 28)).toISOString()}
    />
  </DefaultLayout>
);

export default Home;

//
// Data
//

export const getStaticProps: GetStaticProps<HomeProps> = async () => (
  // NOTE: If we want to switch to using headless CMS, replace this with an API call.
  { props: { ...homeContent } }
);
