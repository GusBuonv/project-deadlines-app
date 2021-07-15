import Head from 'next/head';
import styled from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { GetStaticProps } from 'next';
import { EntityState, nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import * as homeContent from '../assets/home-content.json';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import ProjectList from '../components/projectList/project-list';
import ControlsSpan from '../components/ui/controls-span';
import { WithClassName } from '../util/types';
import destroyAllProjectLists from '../store/deadlines/actions/destroyAllProjectLists';
import { CenteredFlexColumnCSS, SetPaddingX, VerticalListMarginCSS } from '../styles';
import { selectProjectIds } from '../components/project/projectsSlice';
import createProjectList from '../store/deadlines/actions/createProjectList';
import { ProjectListEntity } from '../components/projectList/types';
import { fadeIn, fadeOutInstantly } from '../styles/animations';
import DefaultMain from '../partials/default-main';
import DefaultFooter from '../partials/default-footer';
import blurOnMouseUp from '../util/blurOnMouseUp';
import selectPageTitle from '../store/globals/selectors/selectPageTitle';
import LabelledIconButton from '../components/ui/labelled-icon-button';
import { selectProjectListIds } from '../components/projectList/slices/projectListsSlice';
import EditableHeadingWithButton from '../components/ui/editable-heading-with-button';
import updatePageTitle from '../store/globals/actions/updatePageTitle';

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

const EditablePageTitle = styled(EditableHeadingWithButton)`
  width: 100%;
  margin-bottom: 5rem;

  display: grid;
  grid-auto-flow: rows;

  &>button {
    justify-self: flex-end;
  }

  h1, input {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;

    @media (min-width: 481) {
      line-height: 1.15;
      font-size: 4rem;
      font-weight: 700;
    }
  }

  @media (min-width: 481px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, var(--title-column-weighting)) minmax(0, 1fr);
    grid-template-areas: ". title button";
    column-gap: var(--column-gap);

    &>div,
    &>h1 {
      grid-area: title;
      max-width: 100%;

      input {
        max-width: 100%;
      }
    }

    &>button {
      max-width: 100%;

      grid-area: button;
      align-self: center;
      justify-self: flex-start;
    }
    --title-column-weighting: 6fr;
    --column-gap: 0.5rem;
  }
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
  description: string,
  favicon: string,
}

const HomeRaw = ({
  description,
  favicon,
  className,
}: WithClassName<HomeProps>): JSX.Element => {
  const projectListIds = useAppSelector(selectProjectListIds);
  const projectIds = useAppSelector(selectProjectIds);
  const projectLists = useAppSelector((state) => state.projectLists);
  const dispatch = useAppDispatch();
  const pageTitle = useAppSelector(selectPageTitle);
  const flipKey = projectListIds.join() + projectIds.join();

  const spring = {
    stiffness: 230,
    damping: 30,
    overshootClamping: false,
  };

  const createNewList = useCallback(() => dispatch(createProjectList({
    projectListId: nanoid(),
    projectListDisplayId: nanoid(),
  })), [dispatch]);

  const deleteAllLists = useCallback(() => dispatch(destroyAllProjectLists()), [dispatch]);

  const shouldFlipButton = useCallback((
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => {
    const prevLength = prev?.ids.length ?? [];
    const currentLength = current?.ids.length ?? [];
    return (
      (prevLength === 0 || currentLength === 0)
      && prevLength !== currentLength
    );
  }, []);

  const shouldFlipControls = useCallback((
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => (!shouldFlipButton(prev, current)), [shouldFlipButton]);

  const updateTitle = useCallback((value: string) => dispatch(updatePageTitle(value)), [dispatch]);

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
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <link rel="icon" href={favicon} />
        <html lang="en" />
      </Head>

      <StyledMain $tall={projectListIds.length !== 0}>
        <Flipped flipId="heading" translate>
          <EditablePageTitle
            text={pageTitle}
            onChange={updateTitle}
            saveLabel="Save New Page Title"
            editLabel="Edit Page Title"
            headingTag="h1"
          />
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
              headingTag="h2"
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
