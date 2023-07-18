# Step 2

But still no issues list. Let's do it really quick.

[Issues Submodule](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/modules/Repo/index.js#L16C9-L16C9) requests [issues data](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/providers/FetchIssues/__response__/sample.json) using appropriate [gql query schema file](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/providers/FetchIssues/FetchIssues.gql). Puts [the result](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/providers/FetchIssues/__data__/sample.js) into [Data Provider Context](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/providers/FetchIssues/Fetch.js) and renders [issues list](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/components/IssuesList/index.js#L11) inside of it. [The story implementation](https://github.com/boonya/backendless-apollo-client/blob/step-2/src/modules/Repo/index.stories.js#L24).

[The result as a story](https://refs-tags-step-2--6419a8385ed98e10f7c94189.chromatic.com/?path=/story/modules-repo--issues-shown)

And here is how the application works.

- `git checkout step-2`
- `npm start`
- [`open http://localhost:3000/`](http://localhost:3000/)
