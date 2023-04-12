# How to do a FrontEnd ahead of BackEnd

## Problematic

Everybody would like to make the code clear, nice and stable, without being under pressure and not to hurry. But in the real world, business wants us to deliver features as soon as possible. Because of this we have to figure out how to speed up the development process. One of the most obvious ways would be to start development of FrontEnd in parallel with BackEnd. Or even earlier. But how to do that especially if you need to implement a complex page which is going to interact with the API in many different ways?

So, here I would try to show you the receipt I used for more than a year and I am happy about it.

## Tech Stack

- [React](https://react.dev/) - the base
- [@apollo/client](https://www.apollographql.com/docs/react/) - GraphQL client and state management
- **or** an alternative library to interact with Rest API - [react-query](https://react-query-v3.tanstack.com/overview)
- [Storybook](https://storybook.js.org/) - to build UIs in isolation
- [Mock Service Worker](https://mswjs.io/) - to mock an API by intercepting requests on the network level.
- [Jest](https://jestjs.io/) - Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - test UI components in a user-centric way
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) - custom DOM element matchers for Jest
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - to simulate user interactions by dispatching the events

## Architecture

In my application I differentiate components by the following groups.

### @src/components

General purpose components that render common UI things. Such as ErrorBoundary, Progressbar and so on.

### @src/hooks

General purpose react hooks. Any react hooks that may be needed anywhere in the application. Such as useSafeContext, useLanguage, useDateFormat and others.

### @src/modules

Here I usually place the things that represent the core of business logic. Separate application pages, screens, dialogs and their submodules.

### @src/providers

By provider I mean any component or hook that provides something like data, context or general behavior.

E.g. The provider of Google Maps Api manages API keys, loads a script from CDN, instantiates services that the application needs and provides them via Context API.

In this directory I also implement the code that interacts with BackEnd, transforming the data received to the format that other application components understand. I call that kind of component DataProvider. And this is the core idea of the receipt I am going to share with you today.

### @src/utils

Miscellaneous code such as helpers and general purpose functions and others that can not be placed in the directories described above.

### .storybook aka @sb

Storybook’s space where [it keeps its configuration](https://github.com/boonya/backendless-apollo-client/blob/main/.storybook/preview.js) but also here I define decorators that may be used across all the stories.

## @test

[Renderers](https://github.com/boonya/backendless-apollo-client/blob/main/test/render.js#L17), transformers, general stubs, mocks, helpers and decorators.

## The Plan

First of all we need to imagine some task.

1. Let’s say our goal is to implement a page where you can see some repository name, its description and basic data that was fetched from your github (fetch single entity).
2. On the same page we want to see a list of issue titles from this repo but only if we clicked a button (fetch multiple entities + lazy query).
3. From every item of this list we would like to navigate to the separate page to read the details of the issue chosen (code splitting, routing, conditional fetching, caching).
4. And also we would like to see how to play with mutations. So let’s do something to manage reactions on an issue.

Ambitious enough, right? So let’s go.

## How it’s built?

![Funny picture "When frontend is ready before backend"](./docs/funny-pic.jpg)

**************************

## Misc

If you want to play with this application on your machine, you have to create your local `.env` file and fill it out with actual secrets.
Also do not forget to run `nvm use` command to apply appropriate `node` and `npm` versions and then install dependencies by `npm i`.

```sh
cp .env.sample .env
```

[GitHub GraphQL API](https://studio.apollographql.com/public/github/home?variant=current)
