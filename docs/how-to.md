# How it’s built?

For the first step we need to have several things:

### [@src/providers/FetchRepo](https://github.com/boonya/backendless-apollo-client/blob/main/src/providers/FetchRepo/index.js)

Data provider that fetch data from the server, normalize it and serve it to the context.

### [@src/modules/Repo](https://github.com/boonya/backendless-apollo-client/blob/main/src/modules/Repo/index.js)

The module to provide data context to the downstream components.

### [@src/components/RepoDetails](https://github.com/boonya/backendless-apollo-client/blob/main/src/components/RepoDetails/index.js)

The component to show layout with repo details.
