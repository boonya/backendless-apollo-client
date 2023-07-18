# Lets talk a little bit about project architecture

I usually differentiate application by the following group of code.

## @src/components

General purpose components that render common UI things. Such as ErrorBoundary, Progressbar, DataGrids, Dialogs and so on.

## @src/hooks

General purpose react hooks that may be needed anywhere in the application. Such as useLanguage, useDateFormat and others.

## @src/providers

By provider I mean any component or hook that provides something like data, context or general behavior.

E.g. The provider of Google Maps Api manages API keys, loads a script from google CDN, instantiates services that the application needs and provides them via Context API.

In this directory I also implement the code that interacts with BackEnd, transform the data received to the format other application components understand. I call that kind of component DataProvider. And this is the core idea of the receipt I am going to share.

## @src/modules

Are usually represent core of business logic. Separate application pages, screens, dialogs and their submodules.

## @src/utils

Miscellaneous code such as helpers, general purpose functions and others that can not be placed in the directories described above.

## .storybook aka. @sb

Storybook’s space where [it keeps its configuration](https://github.com/boonya/backendless-apollo-client/blob/main/.storybook/preview.js) as well as decorators that may be used across all the stories.

## @test

[Renderer functions](https://github.com/boonya/backendless-apollo-client/blob/main/test/render.js#L17), transformers, general stubs, mocks, helpers, decorators and so on.
