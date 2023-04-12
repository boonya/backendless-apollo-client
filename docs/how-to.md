# How it’s built?

## For the first step we need to have several things

- [Data provider that fetch data from the server, normalize it and serve it to the context.](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/index.js)
- [The module to provide data context to the downstream components.](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Repo/index.js)
- [The route where we are going to render our module.](https://github.com/boonya/backendless-apollo-client/blob/main/src/index.js#L26)
- [The component to show layout with repo details.](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/RepoDetails/index.js)

## Second step involves conditional fetching

- [So we will need to define the module which implements such conditional logic.](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Repo/Issues.js)
- [Data provider to fetch a list of issues, normalize it's data and pass the data to the context.](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchIssues/index.js)
- [The component to render a layout and data.](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/IssuesList/index.js)

## To achieve for what we planned in step three

- [We need a route by which we are going to render appropriate module.](https://github.com/boonya/backendless-apollo-client/blob/main/src/index.js#L27)
- [The module where we serve a context from data provider.](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Issue/index.js)
- [Data provider to fetch and normalize an issue data.](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchIssue/index.js)
- [And the component to show that data.](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/IssueDetails/index.js)

## And finally we want to interact with our server

- [So we want to show a list of available reactions + indicate what is set.](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/Reactions/List.js)
- [That list has to be wrapped by container to provide action handlers.](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/Reactions/index.js)
- Action handlers will trigger appropriate graphql mutations which are encapsulated in their custom react hooks.
  - [@src/providers/AddReaction/useAddReaction](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/AddReaction/useAddReaction.js)
  - [@src/providers/RemoveReaction/useRemoveReaction](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/RemoveReaction/useRemoveReaction.js)
