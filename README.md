# How to do a FrontEnd ahead of BackEnd

![Funny picture "When frontend is ready before backend"](/docs/funny-pic.jpg)

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

## [Architecture](/docs/architecture.md)

## [The Plan](/docs/plan.md)

## [How it's built](/docs/how-to.md)

---

## Misc

If you want to play with this application on your machine, you have to create your local `.env` file and fill it out with actual secrets.
Also do not forget to run `nvm use` command to apply appropriate `node` and `npm` versions and then install dependencies by `npm i`.

```sh
cp .env.sample .env
```

[GitHub GraphQL API](https://studio.apollographql.com/public/github/home?variant=current)
