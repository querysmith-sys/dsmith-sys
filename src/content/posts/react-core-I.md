---
title: "React Core 1: Understanding the Basics"
date: "sept 10, 2026"
slug: "react-core-1"
---

# React Core 1: Understanding the Basics

React is a JavaScript library for building user interfaces. I don't want to talk too much about the introduction—you can Google it or ask an AI about it. Here in this blog, I'll focus on the core concepts you should understand to become comfortable with React. I hope you'll stick around until the end.

## JSX & How React Renders UI

JSX is a syntax extension for JavaScript that allows us to write HTML-like markup inside JavaScript.

For example:

```jsx
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <button>Click me</button>
    </div>
  );
}
```

The browser does not directly understand JSX syntax. During the development/build process, our build tools transform JSX into regular JavaScript that the browser can execute.

You can think of the flow roughly like this:

```text
JSX + JavaScript source code
          ↓
     Build tooling
          ↓
JavaScript/CSS/assets the browser can load
          ↓
        Browser
          ↓
      React starts
          ↓
React renders your components
          ↓
React reconciles the UI
          ↓
Necessary DOM updates
          ↓
      Browser paints
          ↓
       You see the UI
```

For example, when the browser loads a typical React application, it first loads the HTML file. The HTML contains something like:

```html
<div id="root"></div>
```

Then the JavaScript application runs and React mounts the application into that root:

```jsx
createRoot(document.getElementById("root")).render(<App />);
```

React then uses your components to determine what the UI should look like.

You may have heard the term **Virtual DOM**. It is useful as a mental model for understanding that React maintains an internal representation of the UI and uses reconciliation to determine what needs to change in the actual DOM. The browser itself does not know about React's Virtual DOM.

The important flow to remember is:

```text
State/props change
       ↓
React renders the component again
       ↓
React gets a new description of the UI
       ↓
React reconciles it with the previous one
       ↓
React commits the necessary DOM changes
```

## Element vs Component

This is pretty simple.

Consider this:

```jsx
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <button>Click me</button>
    </div>
  );
}
```

`<h1>`, `<button>`, and `<div>` are JSX that create **React elements**.

`App` is a **component**.

A React element is an immutable plain object that describes what should appear in the UI. A component is a function (or class) that returns React elements.

You can think of it like this:

```text
Component
    ↓
returns
    ↓
React elements
    ↓
React uses them to determine the UI
```

So:

```jsx
function App() {
  return <h1>Hello World</h1>;
}
```

`App` → component

`<h1>Hello World</h1>` → React element created from JSX

## Props vs State

Let's talk about two things you'll use constantly in React: **props and state**.

### Props

Props are inputs passed from a parent component to a child component.

They are similar to function arguments.

For example:

```jsx
function User({ name }) {
  return <h1>Hello {name}</h1>;
}
```

And the parent can pass the prop like this:

```jsx
<User name="Rahul" />
```

You can think of it roughly like:

```text
Parent
   ↓
passes props
   ↓
User({ name: "Rahul" })
```

Props are read-only from the child component's perspective. A child should not modify its props directly.

### State

State is data managed by React that belongs to a component instance and can change over time.

For example:

```jsx
const [count, setCount] = useState(0);
```

Here:

* `count` is the current state value.
* `setCount` is the function we use to request an update to that state.

When the state changes, React schedules a re-render.

One very important thing: **a re-render does not mean React destroys the state and creates it again.**

For example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log("render");

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
```

Initially:

```text
count = 0
   ↓
<h1>0</h1>
```

After clicking the button:

```text
setCount(1)
   ↓
React schedules a render
   ↓
Counter runs again
   ↓
count = 1
   ↓
<h1>1</h1>
```

The state is preserved between renders.

A **re-render** simply means React runs the component again to determine what the UI should look like with the current props and state.

Also, don't confuse a re-render with a page reload. A page reload reloads the entire web page, while a React re-render is part of React's normal rendering process.

React state is stored in memory. If a component is removed from the React tree, its state is no longer preserved. A full page reload also resets in-memory React state.

If you need data to survive a page reload, you need some form of persistence, such as `localStorage`, a database, or another storage mechanism.

### State and props should be treated as immutable

You should not directly mutate state:

```jsx
// ❌ Don't do this
count = count + 1;
```

Instead, use the setter:

```jsx
// ✅
setCount(count + 1);
```

Similarly, don't directly modify props inside a child component.

So remember:

> Props are read-only from the child's perspective, and state should be treated as immutable and updated through its setter.

Now let's put props and state together.

Try to run this example and follow the whole flow of execution from start to end. You'll get a much better idea of how they work together:

```jsx
function Counter({ name }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>
        {name}: {count}
      </h1>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}

function App() {
  return <Counter name="Rahul" />;
}
```

Here, `name` comes from props, while `count` is managed using state.

## Controlled & Uncontrolled Components

This concept mostly comes up with form inputs.

### Controlled components

An input is **controlled** when React state controls its value.

For example:

```jsx
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

The flow is:

```text
User types
    ↓
onChange runs
    ↓
setName(...)
    ↓
React state changes
    ↓
React re-renders
    ↓
input receives the new value
```

Here, React is the source of truth for the input's value.

### Uncontrolled components

An input is **uncontrolled** when the DOM itself maintains the current value.

For example:

```jsx
function Form() {
  const inputRef = useRef(null);

  function handleSubmit() {
    console.log(inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}
```

Here, React isn't storing the input value in state. The DOM maintains it.

`useRef` gives us a way to access the DOM node:

```jsx
inputRef.current
```

Important: **`useRef` itself does not make an input uncontrolled.** The input is uncontrolled because its value is maintained by the DOM rather than being driven by React state.

Also remember:

```text
useState
→ changing state causes a re-render

useRef
→ changing ref.current does not cause a re-render
```

A ref can also store mutable values that persist across renders.

So the simple rule is:

> Use controlled components when you want React to control the input value through state. Use uncontrolled components when you want the DOM to manage the input value.

**TASK:** Write a simple form using both a controlled and an uncontrolled input. Submit the form and compare how you access their values.

## `key` Prop in Lists

The `key` prop is needed when we're rendering multiple elements from a collection.

It helps React identify which items have changed, been added, removed, or moved between renders.

For example:

```jsx
const numbers = [1, 2, 3, 4, 5];

const listItems = numbers.map((number) => (
  <li key={number.toString()}>
    {number}
  </li>
));
```

Keys give elements a stable identity:

```text
key = 1 → first item
key = 2 → second item
key = 3 → third item
```

Keys should be **unique among siblings**. They don't need to be globally unique across your entire application.

For example:

```jsx
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const userElements = users.map((user) => (
  <p key={user.id}>
    {user.name}
  </p>
));
```

Notice that the elements are `<p>` elements, not `<li>` elements. The `key` prop is not specific to lists or `<li>`. It is needed when React is dealing with multiple dynamically generated siblings.

### What about array indexes?

You might see this:

```jsx
users.map((user, index) => (
  <User key={index} user={user} />
));
```

It works, but it can cause bugs when the list can be reordered, inserted into, or have items removed.

For example:

```text
Before:

key=0 → Alice
key=1 → Bob
key=2 → Charlie
```

If Alice is removed:

```text
After:

key=0 → Bob
key=1 → Charlie
```

The keys stayed the same, but the items associated with those keys changed.

If those components contain their own state, React may preserve the state of the old component instance and associate it with a different item.

That's why a stable ID from your data is usually a better key:

```jsx
<User key={user.id} user={user} />
```

Using an index can be okay when the list is static and its order/membership never changes.

Also, don't generate keys like this:

```jsx
key={Math.random()}
```

or:

```jsx
key={Date.now()}
```

Those values can change between renders. React can then treat the element as a completely new element, causing component instances to be recreated and potentially losing their state.

**NOTE:** The goal isn't simply "make the key unique." The key should be **stable and unique among siblings**.

## Lifting State Up

This is a pretty interesting and useful React pattern.

Imagine you have two child components, and both of them need to share the same piece of state.

For example:

```text
        Parent
       /      \
   Child A   Child B
```

If both children need access to `count`, where should `count` live?

We can **lift the state up** to their closest common ancestor:

```text
        Parent
        count
       /     \
      ↓       ↓
 Child A   Child B
```

The parent owns the state and passes the required data and update functions down through props.

For example:

```jsx
function ParentCounter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>

      <ChildBlue value={count} />
      <ChildGreen value={count} />
    </>
  );
}
```

Now both children receive the same `count`:

```jsx
function ChildBlue({ value }) {
  return <p>{value}</p>;
}

function ChildGreen({ value }) {
  return <p>{value}</p>;
}
```

The important idea is:

> **Move shared state to the closest common ancestor of the components that need it.**

This doesn't mean we should move every piece of state all the way up to `<App />`.

If two components can share state through a lower-level parent, keep the state there.

Moving state unnecessarily high can lead to unnecessary prop drilling and make state ownership harder to understand.

**TASK:** Build a simple counter app with two child components. The first child should display the count in blue, while the second displays it in green. Keep the count state in their parent and pass it down through props.

### What about Context?

Now imagine that the component that needs the state is deeply nested:

```text
Parent
  ↓
Child
  ↓
AnotherChild
  ↓
AnotherChild
  ↓
DeepChild ← needs the data
```

Passing the same prop through every component can become annoying. This is called **prop drilling**.

In this situation, we can use the **Context API**.

Context allows a value to be made available to components within a particular provider subtree without manually passing it through every intermediate component.

For example:

```text
Provider
   ↓
   ├── Component A
   │
   ├── Component B
   │      ↓
   │   Component C
   │      ↓
   │   DeepChild ← useContext()
   │
   └── Component D
```

Context isn't necessarily "global state." It is better to think of it as a way to make a value available to a subtree of components.

Also, Context doesn't manage state by itself.

You can combine Context with `useState`:

```jsx
const [user, setUser] = useState(null);

<UserContext.Provider value={{ user, setUser }}>
  <App />
</UserContext.Provider>
```

Here:

```text
useState
   ↓
manages the state

Context
   ↓
makes that state available to descendants
```

So don't use Context for every piece of state. If two nearby components need to share state, lifting the state up and passing props is often simpler.

Context becomes useful when many components in a subtree need the same value and passing props through multiple levels becomes inconvenient.

## Conclusion

That's it for React Core 1.

We've covered some of the concepts that form the foundation of React:

* JSX
* How React renders UI
* Elements vs Components
* Props vs State
* Controlled vs Uncontrolled Components
* `useState` vs `useRef`
* The `key` prop
* Lifting State Up
* Context and Prop Drilling


i think this is enough for now, it covers mostly the basics of react. In the next blog, we'll cover more advanced topics, it will be interesting, so stay tuned.

Happy coding!
