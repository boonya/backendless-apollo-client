# Step 1

## Components

### Data Provider

Let's imagine the situation we have FE resource to start developing but BE team is not capable to work on their part of implementation. The only thing they cane give you is an approximated GraphQL query you gonna use and the response the server will respond you.

Okay, thats pretty much enough to start.

[Here is the query](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/FetchRepo.gql) and [here is the sample of response](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/__response__/sample.json).

In our application we want to use normalized data, so let's imagine how it's gonna look like and define a sample of it. [Here is it](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/__data__/sample.js).

And since now we have everything to start creating the code. The code which is going to perform the query above, to respond by response above to provide it as normalized data above. But at first let us start to define [test suite for this code](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/useFetch.test.js). So we create a set of expectations that the code is going to follow. And then will tune our code up to meet these expectations.

We expect that our custom react hook

- should execute proper query with proper variables.
- should give an initial result.
- should give a result with a loading state.
- should give a result with a data payload.
- should give a result with an ApolloError.
- should give a result with a data and an error at the same time.

[Then we create the hook itself](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/useFetch.js#L66).

After that we have to render that hook somewhere and reuse it response. The best place for that is a Data Provider. And as previous [we define our expectations in a form of test suite](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/index.test.js) and [define the code of provider](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/index.js) itself. [Context Provider is a pretty simple module](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/ContextProvider.js) that exports a Context.Provider component and a hook to extract the data from that context.

### The Module component

Now it's time to use the Data Provider. And the best place for it is [appropriate module component](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Repo/index.js#L14). Here we extract properties for the data provider using params of current route. We render Data Provider and a Consumer Component as it's child. A good habit is to use ErrorBoundary on this layer.

That is pretty much it, about the module component.

### The component to show layout with repo details

[In the component we extract the data provided by the DataProvider above](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/RepoDetails/index.js#L8), and render something based on that data.

Nothing special.

## Stories

Based on all of the above code we wanna test how it everything interact with each other. And how it looks like.
[And Storybook is coming to help us](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Repo/index.stories.js#L10).

We know that or module is going to be rendered by some specific route,
