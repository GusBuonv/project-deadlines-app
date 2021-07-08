# Koala - Web Engineering Challenge - Deadline Countdown App

A simple web app that displays a countdown timer with

## Getting Started

1. Install [`Yarn`](https://yarnpkg.com/en/) and [`TypeScript`](https://www.typescriptlang.org)

2. Install the project dependencies:

    ```bash
    yarn install
    ```

3. First, run the development server:

    ```bash
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Backstory

A high-profile client has hired your company to build a countdown clock web app to help them keep track of an internal deadline. Since this deadline keeps changing, the countdown must be able to be reset and adjusted as necessary.

The original developer tasked with building the app was too distracted watching episodes of Selling Sunset to pay attention to code quality, deadlines, or architectural best practices. ~~It's unclear if the codebase even compiles. In a panic, your company has tasked you with both finishing the app and ensuring the code adheres to your own personal engineering standards.~~

*I have elected to abandon the original codebase entirely. It's reliance on `react-scripts` made the build hard to configure and obscured dependencies. By restarting in Next.js, the application is ensured to be more extensible and stricter coding standards can be enforced through eslint configuration.*

## Requirements

- There must be an input that takes a number or set of numbers that can be used to set and reset a countdown timer.
- To us, code quality is just as important as feature execution. Without being prescriptive, any decisions you make to refactor, test, style, or fix anything in the existing code are just as important as successfully building the countdown itself.
- The application must make use of the following dependencies:
  - React
  - TypeScript
  - Styled Components

### Notes

- The codebase is intentionally sloppy. We want to encourage you to change any if not all of it as you see fit.
- We've connected the app to an API call that returns a configuration JSON. As you work on the app, we encourage you to use this data to help inform your styling.
- There is no limit to the scope of this project. Creativity, critical thinking, and an eye for stability and extensibility are paramount to the culture here at Koala.
- Enjoy yourself. We want you to show off. Make up requirements and solve problems we haven't asked you to solve if you think they'd be exciting to build. We want to see from you a genuine passion and a love of the craft.

### Self-Imposed Requirements

- Support multiple deadlines associated with different projects
- Group deadlines by organization/team (e.g. - "Company Wide", "HR", "Engineering", etc.)
- Set the countdown either by number of days, hours, minutes from the current time OR datetime input
- Countdown shows deadline and time until deadline
- Resetting the countdown should generate a calendar event
- Changes should persist across page visits (i.e. state is stored locally)

### Additional Feature Concepts

- Deadlines and deadline groups can be customized with colors & icons
- State is persisted on the backend and fetched by users
- User login with admin and regular users
- Admin users can create, delete, & update deadlines
- Deadlines have a progress meter controlled by admins
- Admin permissions can limit the organizations in which they can make changes
- All users can subscribe to email notifications about impending deadlines, new/cancelled deadlines, and deadline changes
  - Subscriptions can be minutely controlled (e.g. subscribe only to certain teams, projects, and types of notifications)
- PWA with push notifications
  - Ability to control push & email notification subscriptions independently
