# How to do a FrontEnd ahead of BackEnd

## Problematic

Everybody would like to make the code clear, nice and stable, without being under pressure and not to hurry. But in the real world, business wants us to deliver features as soon as possible.

Because of this we have to figure out how to speed up the development process. One of the most obvious ways would be to start development of FrontEnd in parallel with BackEnd. Or even earlier. But how to do that especially if you need to implement a complex page which is going to interact with the API in many different ways?

So, here I would try to show you the receipt I used for more than a year and I am still happy about it.

## Ingredients

- [React](https://react.dev/) - as the root of everything with it's awesome context API. You may love it or hate it, but you know what it is for sure.
- [@apollo/client](https://www.apollographql.com/docs/react/) - which is a GraphQL client and state management library.
- **or** [@tanstack/react-query](https://tanstack.com/query/v4/) as an alternative.
- [Storybook](https://storybook.js.org/) - A thing that gives us a power to build UIs in isolation.
- [Mock Service Worker](https://mswjs.io/) - The library helps us to mock an API by intercepting requests on the network level.
- [Jest](https://jestjs.io/) - Just a Testing Framework of choice.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - Helps us to test UI components in a user-centric way.
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) - a set of custom DOM element matchers for Jest just to make your life a bit easier.

## The Plan

We are going to create a Single Page Application.

- On the main page of it some github repo brief information are going to be shown.
- As well here will be a button to show list of issues from the same github repo.
- Each issue data are going to be presented by a separate route.
- We will be able to react on each issue or undo our reaction.

## The goal

<details>
<summary>I want to show every component of application to be working without being connected to real backend. And then we will connect it smoothly.</summary>

![Funny picture "When frontend is ready before backend"](/docs/funny-pic.jpg)

- [Architecture](/docs/architecture.md)
- [Step 0](/docs/step-0.md) - Application skeleton
- [Step 1](/docs/step-1.md) - Fetch repository details
- [Step 2](/docs/step-2.md) - Fetch list of issues
- [Step 3](/docs/step-3.md) - Fetch specific issue details
- [Step 4](/docs/step-4.md) - Manipulate by issue reactions
- [Conclusions](/docs/conclusions.md)

</details>

---

## Misc

If you want to play with this application on your machine, you have to create your local `.env` file and fill it out with actual secrets.
Also do not forget to run `nvm use` command to apply appropriate `node` and `npm` versions and then install dependencies by `npm i`.

```sh
cp .env.sample .env
```

[GitHub GraphQL API](https://studio.apollographql.com/public/github/variant/current/explorer)
