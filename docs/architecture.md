# Architecture

In my application I differentiate components by the following groups.

## @src/components

General purpose components that render common UI things. Such as ErrorBoundary, Progressbar and so on.

## @src/hooks

General purpose react hooks. Any react hooks that may be needed anywhere in the application. Such as useSafeContext, useLanguage, useDateFormat and others.

## @src/modules

Here I usually place the things that represent the core of business logic. Separate application pages, screens, dialogs and their submodules.

## @src/providers

By provider I mean any component or hook that provides something like data, context or general behavior.

E.g. The provider of Google Maps Api manages API keys, loads a script from CDN, instantiates services that the application needs and provides them via Context API.

In this directory I also implement the code that interacts with BackEnd, transforming the data received to the format that other application components understand. I call that kind of component DataProvider. And this is the core idea of the receipt I am going to share with you today.

## @src/utils

Miscellaneous code such as helpers and general purpose functions and others that can not be placed in the directories described above.

## .storybook aka @sb

Storybook’s space where [it keeps its configuration](https://github.com/boonya/backendless-apollo-client/blob/main/.storybook/preview.js) but also here I define decorators that may be used across all the stories.

## @test

[Renderers](https://github.com/boonya/backendless-apollo-client/blob/main/test/render.js#L17), transformers, general stubs, mocks, helpers and decorators.
