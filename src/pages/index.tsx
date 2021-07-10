import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import DefaultLayout from '../layouts/default-layout';
import AnchorCard, { CardProps } from '../components/anchor-card';
import * as homeContent from '../assets/home-content.json';
import { CenteredFlexCSS } from '../styles';

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

const FlexWrapDiv = styled.div`
  ${CenteredFlexCSS}
  flex-wrap: wrap;
`;

const StyledAnchorCard = styled(AnchorCard)`
  ${FlexWrapDiv}>& {
    width: 45%;
    min-width: 16rem;
    margin: 1rem;
  }
`;

//
// Page Component
//

type HomeProps = {
  title: string,
  description: string,
  favicon: string,
  cardData: CardProps[],
};

const Home = ({
  title,
  description,
  favicon,
  cardData,
}: HomeProps): ReactElement => (
  <DefaultLayout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex" />
      <link rel="icon" href={favicon} />
    </Head>

    <H1>{title}</H1>

    <FlexWrapDiv>
      {cardData.map((props) => (
        <StyledAnchorCard
          key={props.title}
          title={props.title}
          description={props.description}
          href={props.href}
        />
      ))}
    </FlexWrapDiv>
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
