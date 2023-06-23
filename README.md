The karate kid kickstart is an intense, almost entirely self learnt, karate kid style (wash in, wash out) 13 steps program for front end developers where the trainee has to write the same app over and over from scratch. Starting from the most simple vanilla JS through writing a simple server with a DB, learning about webpack, flex css, localstorage, cookies, https, jwt, tests, react and much more.

The trainee also learns how to deploy their app to production via a standalone service (heroku for example).

The final project is a fully deployed TDD written app on top of yoshi, WSR and wix ci.

Deadtime tasks:
Coding games and Katas:

https://www.codewars.com/ An online programing game (I didn't do that.. if u do plz let me know how was it)
https://adventofcode.com/
https://alexnisnevich.github.io/untrusted/
https://screeps.com/
https://www.codingame.com
read everythign u can in mdn****
YouTube:

If you're into videos, you can and should subscribe to some of these youtube channels. Just look for an interesting talk and watch as you learn:

How the event loop works A must watch for any FED
Sergey's "Must watch list"
JS Conf (probably the biggest js conf)
Nice dude that explains design patterns and features in a fun way. link
React Europe
Step 1:
Your first task will be to write a simple todo app. For now it will be client only. You can only use html, vanilla js and css (no other lib like react/angular/lodash/jquery are allowed).

The app should support:

Adding a new todo item
Editing an existing todo item
Deleting a todo item
Showing the list of all todo items
Mark a todo item as done.
To achieve it you will need to learn:

Flex layout in css
https://flexboxfroggy.com/
http://www.flexboxdefense.com/
https://flukeout.github.io/
what is the dom (document object model)
js dom manipulation
html syntax
You can find a lot of information about each of these items. Remember to always read the manual on the mdn site (Mozilla developer network) and not w3c school.

Videos that I want you to watch in this step:

What the heck is the event loop anyway?
Step 2 (Deadline - DD/MM)
To learn:

Webpack
Build your own Webpack
Localstorage
Cookies
Localstorage vs cookies
What are the differences between LS and cookies
When should we use LS and when should we use cookies
What are the different types of cookies
Bind
Hoisting
With the mentor

Bind exercise
Hoisting exercise - TBD
Todo:

Use localstorage to save the todos - refresh should not lose the todos
Use webpack as your bundler
Step 3 (Deadline - DD/MM)
To learn:

Semver - read all about it
Source map loader vs devtool
Chrome debugger
Prototype (read about prototypical inheritance)
Todo:

Add source maps to your project
Change css to be jss (css inside js)
With the mentor:

Currying
Step 4 (Deadline - DD/MM)
Learn about:

Http protocol
1 way communication
http methods
Https
Learn what is private/public key (RSA)
Web socket protocol
Server + express
Learn about express library
Fetch API
Read this blogpost
Todo:

Write the todo app again, this time with a server. The server should hold the todos in its memory (no need for localstorage). Use webpack, XHR Use axios,

Step 5 (Deadline - DD/MM) - Look mommy I’ve written an actual piece of software you can actually use!
Todo:

Install "edit this cookie" extension
Make it a server for “everyone” (cookies and userIds, HTTP cookie)
Push to heroku
Use free redis add-on, Mongo atlas or any other db preference
Step 6 (Deadline - DD/MM)
To learn:

Typescript
Todo:

Typescript everything from scratch
Step 7 (Deadline - DD/MM)
To learn:

Signed vs Encrypted
JWT
Symmetric vs asymmetric encryption
Using asymmetric to exchange symmetric keys
Read about pros & cons of symmetric vs asymmetric
Todo:

In this step you can use the app from the previous step.

replace your cookie with a JWT cookie
login/logout - design in a sequence diagram (learn about sequence diagram as well if you don’t know what this is)
Step 8 (Deadline - DD/MM) - Welcome to React!
To learn:

React - do the getting started tutorial (only in case you don't know react)
Learn about hooks
Todo: Write the todo app from scratch using typescript and react. You can re-use your server from previous steps.

Step 9 (Deadline - DD/MM) - Testing!
To learn: Watch uncle bob TDD episode 6 part 1+2 link

Todo:

Write everything from scratch using TDD
React tests using jest
React-testing-library
At least 1 e2e test using puppeteer (blackbox)
Step 10 (Deadline - DD/MM) - The State of affairs
To learn: Now that you know react a little bit lets learn how it works under the hood:

Build your own react
Video - https://www.youtube.com/watch?v=RmAIwZeY0tk
Blogpost - https://hackernoon.com/build-your-own-react-48edb8ed350d
redux
Mobx / mobx state tree
Providers and context using hooks
With the mentor: Do we providers/contexts them when we have hooks?
