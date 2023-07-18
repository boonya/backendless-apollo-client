# Step 4

```sh
git checkout step-4
```

The only one thing left is reactions.

We need [a hook to add a reaction](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/providers/AddReaction/useAddReaction.js). And [to remove reaction](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/providers/RemoveReaction/useRemoveReaction.js).

Both of them render useMutation hook with their own mutation schema.

- [mutation AddReaction](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/providers/AddReaction/AddReaction.gql)
- [mutation RemoveReaction](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/providers/RemoveReaction/RemoveReaction.gql)

These mutations gives us responses and [we have to clear apollo cache](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/providers/AddReaction/useAddReaction.js#L23) after mutation successfully performed. When we remove cache item from the apollo cache, apollo client will automatically trigger query that produced this item before. So, we don't need to care about latest state of data.

This is [the component where we call these functions](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/components/Reactions/index.js).

[Story implementation](https://github.com/boonya/backendless-apollo-client/blob/step-4/src/components/IssueDetails/index.stories.js#L13).

```sh
npm run storybook
```

Here is [how it works in the storybook](https://refs-tags-step-4--6419a8385ed98e10f7c94189.chromatic.com/?path=/story/modules-issue--fullfilled).

And the application.

- `npm start`
- [`open http://localhost:3000/`](http://localhost:3000/)
