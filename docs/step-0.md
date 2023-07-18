# Step 0

I have created several tags for quick navigation through implementation stages.

So let's open source code at [the tag called step-0](https://github.com/boonya/backendless-apollo-client/tree/step-0/src). Here you can see all the directories [I just mentioned](/docs/architecture.md).

There are couple of providers already. [Apollo](https://github.com/boonya/backendless-apollo-client/tree/step-0/src/providers/Apollo/index.js) and [Theme](https://github.com/boonya/backendless-apollo-client/tree/step-0/src/providers/Theme/index.js). First one instantiates apollo client and the second provides a theme context. Not really interesting.

[Repo](https://github.com/boonya/backendless-apollo-client/tree/step-0/src//modules/Repo/index.js) and [Issue](https://github.com/boonya/backendless-apollo-client/tree/step-0/src//modules/Issue/index.js) modules, but they are just stubs yet.

And couple of dummy components such as [RepoDetails](https://github.com/boonya/backendless-apollo-client/tree/step-0/src/components/RepoDetails/index.js), [IssuesList](https://github.com/boonya/backendless-apollo-client/tree/step-0/src/components/IssuesList/index.js), [Progressbar](https://github.com/boonya/backendless-apollo-client/tree/step-0/src/components//Progressbar/index.js) and so on.

Lets run the application in the sate we currently have, to proof it works somehow.

- `git checkout step-0`
- `npm start`

The application works but instead of real data we see stubs.
