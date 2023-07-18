# Step 3

The implementation of issue details is quite similar as well.

[Fetch hook](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/useFetch.js) with [query schema](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/FetchIssue.gql), [sample of response](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/__response__/sample.json), [data](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/__data__/sample.js), [test suite](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/useFetch.test.js#L64), [context provider](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/providers/FetchIssue/Fetch.js)
and [the module](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/modules/Issue/index.js) relies on all of the above.

[Story implementation](https://github.com/boonya/backendless-apollo-client/blob/step-3/src/modules/Issue/index.stories.js#L18) and [the result](https://refs-tags-step-3--6419a8385ed98e10f7c94189.chromatic.com/?path=/story/modules-issue--fullfilled) of it.
