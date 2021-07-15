import Head from 'next/head';
import styled, { css } from 'styled-components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { GetStaticProps } from 'next';
import { EntityState, nanoid } from '@reduxjs/toolkit';
import { ChangeEventHandler, useState } from 'react';
import * as homeContent from '../assets/home-content.json';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { selectProjectListIds } from '../components/projectList/projectListsSlice';
import ProjectList from '../components/projectList/projectList';
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
import useEditMode from '../hooks/useEditMode';
import updatePageTitle from '../store/globals/actions/updatePageTitle';
import HiddenLabelTextInput from '../components/ui/hidden-label-text-input';
import IconButton from '../components/ui/icon-button';
import LabelledIconButton from '../components/ui/labelled-icon-button';

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

const TitleCSS = css`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;

  @media (min-width: 481) {
    line-height: 1.15;
    font-size: 4rem;
    font-weight: 700;
  }
`;

const Title = styled.h1`
  ${TitleCSS}
`;

const EditTitleButton = styled(IconButton)`
`;

const TitleInput = styled(HiddenLabelTextInput)`
  input {
    ${TitleCSS}
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 5rem;

  display: grid;
  grid-auto-flow: rows;

  &>${EditTitleButton} {
    justify-self: flex-end;
  }

  @media (min-width: 481px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, var(--title-column-weighting)) minmax(0, 1fr);
    grid-template-areas: ". title button";
    column-gap: var(--column-gap);

    &>${Title},
    &>${TitleInput} {
      grid-area: title;
    }

    &>${EditTitleButton} {
      max-width: 100%;

      grid-area: button;
      align-self: center;
      justify-self: flex-start;

      input {
        max-width: 100%;
      }
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
  const [mode, toggleEditMode] = useEditMode('display');
  const [draft, setDraft] = useState<string>(pageTitle);
  const handleDraftChange: ChangeEventHandler<HTMLInputElement> = (
    (e) => setDraft(e.target.value)
  );

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

  const modeParams = {
    /** DISPLAY MODE */
    display: {
      header: (<Title>{pageTitle}</Title>),
      label: 'Edit Project List',
      icon: 'pencil' as const,
      action: toggleEditMode,
    },
    /** EDIT MODE */
    edit: {
      header: (
        <TitleInput
          id="page-title"
          value={draft}
          onChange={handleDraftChange}
        />
      ),
      label: 'Save Changes',
      icon: 'save' as const,
      action() {
        if (draft !== pageTitle) dispatch(updatePageTitle(draft));
        toggleEditMode();
      },
    },
  };

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
      </Head>

      <StyledMain $tall={projectListIds.length !== 0}>
        <Flipped flipId="heading" translate>
          <TitleWrapper>
            {modeParams[mode].header}
            <EditTitleButton
                // icon={modeParams[mode].icon}
              icon={modeParams[mode].icon}
              size="medium"
                // label={modeParams[mode].label}
              label={modeParams[mode].label}
              iconFocusColor="#0f0"
              onClick={modeParams[mode].action}
              onMouseUp={blurOnMouseUp}
            />
          </TitleWrapper>
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
              headerAs="h2"
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
