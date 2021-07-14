import Head from 'next/head';
import styled from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { GetStaticProps } from 'next';
import { EntityState, nanoid } from '@reduxjs/toolkit';
import * as homeContent from '../assets/home-content.json';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { selectProjectListIds } from '../components/projectList/projectListsSlice';
import ProjectList from '../components/projectList/projectList';
import LabelledIconButton from '../components/labelled-icon-button';
import ControlsSpan from '../components/controls-span';
import { WithClassName } from '../util/types';
import destroyAllProjectLists from '../store/actions/destroyAllProjectLists';
import { CenteredFlexColumnCSS, SetPaddingX, VerticalListMarginCSS } from '../styles';
import { selectProjectIds } from '../components/project/projectsSlice';
import createProjectList from '../store/actions/createProjectList';
import { ProjectListEntity } from '../components/projectList/types';
import { fadeIn, fadeOutInstantly } from '../styles/animations';
import DefaultMain from '../layouts/partials/default-main';
import DefaultFooter from '../layouts/partials/default-footer';
import blurOnMouseUp from '../util/blurOnMouseUp';

//
// Styles
//

const StyledFlipper = styled(Flipper)`
  min-height: 100vh;
  ${CenteredFlexColumnCSS}

  &>${DefaultMain} {
    flex-grow: 1;
    ${SetPaddingX('0.5rem')}
  }

  body {
    overflow: scroll;
  }
`;

const StyledDefaultFooter = styled(DefaultFooter)`
  ${StyledFlipper}>& {
    ${SetPaddingX('0.5rem')}
  }
`;

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

const StyledMain = styled(DefaultMain)<{ $tall: boolean }>`
  ${CenteredFlexColumnCSS}
  justify-content: ${({ $tall }) => ($tall ? 'space-between' : 'center')};
  flex-grow: ${({ $tall }) => ($tall ? '1' : '0')};
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
  const projectListIds = useAppSelector(selectProjectListIds);
  const projectIds = useAppSelector(selectProjectIds);
  const projectLists = useAppSelector((state) => state.projectLists);
  const dispatch = useAppDispatch();

  const flipKey = projectListIds.join() + projectIds.join();

  const spring = {
    stiffness: 230,
    damping: 30,
    overshootClamping: false,
  };

  const createNewList = () => dispatch(createProjectList({
    projectListId: nanoid(),
    projectListDisplayId: nanoid(),
  }));

  const deleteAllLists = () => dispatch(destroyAllProjectLists());

  const shouldFlipButton = (
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => {
    const prevLength = prev?.ids.length ?? [];
    const currentLength = current?.ids.length ?? [];
    return (
      (prevLength === 0 || currentLength === 0)
      && prevLength !== currentLength
    );
  };

  const shouldFlipControls = (
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => (!shouldFlipButton(prev, current));

  return (
    <StyledFlipper
      className={className}
      flipKey={flipKey}
      spring={spring}
      decisionData={projectLists}
      handleEnterUpdateDelete={({
        hideEnteringElements,
        animateEnteringElements,
        animateExitingElements,
        animateFlippedElements,
      }) => {
        hideEnteringElements();
        animateEnteringElements();
        animateExitingElements()
          .then(animateFlippedElements);
      }}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <link rel="icon" href={favicon} />
      </Head>

      <StyledMain $tall={projectListIds.length !== 0}>
        <Flipped flipId="heading" translate>
          <H1>{title}</H1>
        </Flipped>
        {projectListIds.map((id) => (
          <Flipped
            key={id}
            flipId={id}
            onAppear={fadeIn}
            onExit={fadeOutInstantly}
            translate
          >
            <StyledProjectList
              key={id}
              id={id}
            />
          </Flipped>
        ))}
        <Flipped flipId="control-span" translate shouldFlip={shouldFlipControls}>
          <ControlsSpan>
            <Flipped flipId="add-list-button" translate shouldFlip={shouldFlipButton}>
              <LabelledIconButton
                icon="plus-circle-outline"
                size="medium"
                label="Add List"
                iconFocusColor="#00E676"
                onMouseUp={blurOnMouseUp}
                onClick={createNewList}
              />
            </Flipped>
            {projectListIds.length > 0 ? (
              <Flipped
                flipId="delete-all-lists-button"
                shouldFlip={shouldFlipButton}
                onAppear={fadeIn}
                onExit={fadeOutInstantly}
              >
                <LabelledIconButton
                  icon="trash-circle-outline"
                  size="medium"
                  label="Delete All Lists"
                  iconFocusColor="#F44336"
                  onClick={deleteAllLists}
                />
              </Flipped>
            ) : undefined}
          </ControlsSpan>
        </Flipped>
      </StyledMain>
      <Flipped flipId="footer" translate>
        <StyledDefaultFooter />
      </Flipped>
    </StyledFlipper>
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
