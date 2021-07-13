import Head from 'next/head';
import styled from 'styled-components';
import { GetStaticProps } from 'next';
import { nanoid } from '@reduxjs/toolkit';
import DefaultLayout from '../layouts/default-layout';
import * as homeContent from '../assets/home-content.json';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { addProjectList, selectProjectListIds } from '../components/projectList/projectListsSlice';
import ProjectList from '../components/projectList/projectList';
import LabelledIconButton from '../components/labelled-icon-button';
import ControlsSpan from '../components/controls-span';
import { WithClassName } from '../util/types';
import { VerticalListMarginCSS } from '../styles';
import destroyAllProjectLists from '../store/actions/destroyAllProjectLists';

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

const StyledProjectList = styled(ProjectList)`
  ${VerticalListMarginCSS}
`;

//
// Page Component
//

export interface HomeProps {
  title: string,
  description: string,
  favicon: string,
}

const HomeRaw = ({
  title,
  description,
  favicon,
  className,
}: WithClassName<HomeProps>): JSX.Element => {
  const projectLists = useAppSelector(selectProjectListIds);
  const dispatch = useAppDispatch();

  const createProjectList = () => dispatch(addProjectList({
    id: nanoid(),
    title: 'New List',
    displayColor: '#000',
    projectIds: [],
  }));

  const deleteAllLists = () => dispatch(destroyAllProjectLists());

  return (
    <DefaultLayout className={className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <link rel="icon" href={favicon} />
      </Head>

      <H1>{title}</H1>
      {projectLists.map((id) => (
        <StyledProjectList
          key={id}
          id={id}
        />
      ))}
      <ControlsSpan>
        <LabelledIconButton
          icon="plus-circle-outline"
          size="medium"
          label="Add List"
          iconFocusColor="#00E676"
          onMouseUp={({ currentTarget }) => currentTarget.blur()}
          onClick={createProjectList}
        />
        {projectLists.length > 0 ? (
          <LabelledIconButton
            icon="trash-circle-outline"
            size="medium"
            label="Delete All Lists"
            iconFocusColor="#F44336"
            onClick={deleteAllLists}
          />
        ) : undefined}
      </ControlsSpan>
    </DefaultLayout>
  );
};

const Home = styled(HomeRaw)``;

export default Home;

//
// Data
//

export const getStaticProps: GetStaticProps<HomeProps> = async () => (
  // NOTE: If we want to switch to using headless CMS, replace this with an API call.
  { props: { ...homeContent } }
);
