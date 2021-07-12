import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import { nanoid } from '@reduxjs/toolkit';
import DefaultLayout from '../layouts/default-layout';
import * as homeContent from '../assets/home-content.json';
import { addProject } from '../components/project/projectsSlice';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { addProjectList, selectProjectListIds } from '../components/projectList/projectListsSlice';
import ProjectList from '../components/projectList/projectList';

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
}: HomeProps): ReactElement => {
  const projectLists = useAppSelector(selectProjectListIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectLists.length === 0) {
      const projectIds = [nanoid(), nanoid(), nanoid()];
      dispatch(addProject({
        id: projectIds[0],
        deadline: new Date(2022, 0, 0).toISOString(),
        title: 'My Project',
        displayColor: '#29004b',
      }));
      dispatch(addProject({
        id: projectIds[1],
        deadline: new Date(2021, 6, 12, 8).toISOString(),
        title: 'My Project 2',
        displayColor: '#0c3d00',
      }));
      dispatch(addProject({
        id: projectIds[2],
        deadline: new Date(2021, 6, 16).toISOString(),
        title: 'My Project 3',
        displayColor: '#7b0763',
      }));
      dispatch(addProjectList({
        id: nanoid(),
        title: 'My Organization',
        projectIds,
        displayColor: '#140085',
      }));
    }
  }, [projectLists, dispatch]);

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <link rel="icon" href={favicon} />
      </Head>

      <H1>{title}</H1>
      {projectLists.map((id) => (
        <ProjectList
          key={id}
          id={id}
        />
      ))}
    </DefaultLayout>
  );
};

export default Home;

//
// Data
//

export const getStaticProps: GetStaticProps<HomeProps> = async () => (
  // NOTE: If we want to switch to using headless CMS, replace this with an API call.
  { props: { ...homeContent } }
);
