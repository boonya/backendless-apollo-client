# The Plan

First of all we need to imagine some task.

1. Let’s say our goal is to implement a page where you can see some repository name, its description and basic data that was fetched from your github (fetch single entity).
2. On the same page we want to see a list of issue titles from this repo but only if we clicked a button (fetch multiple entities + conditional fetching).
3. From every item of this list we would like to navigate to the separate page to read the details of the issue chosen (code splitting, routing, caching).
4. And also we would like to see how to play with mutations. So let’s do something to manage reactions on an issue.

Ambitious enough, right? So let’s go.
