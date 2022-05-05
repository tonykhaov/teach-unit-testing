### Learn unit testing in JS and React (workshop)

Hello this is my workshop to teach you how to learn unit testing (JS & React)

### Requirements:

- git clone this project
- you only need to write your testing code in `learning-workshop.test.tsx`
- run `npm install`
- run `npm run test:watch`
- from now on you can follow the workshop and you’ll just need to copy and paste the code examples in the `learn-unit-testing.test.tsx` file.

### 1. How to test basic JS functions.

<details>
<summary>Lesson</summary>

```tsx
// add() is the function we want to test
function add(a: number, b: number) {
  return a + b
}

test('should return the sum of the two numbers provided', () => {
  /*
  If I read it literally it means:
  the return of add when I provide 5 and 3 as arguments is 8
  */
  expect(add(5, 3)).toBe(8)

  /*
  expect() takes an argument and compares it to an input with the next method (that's called a matcher).
  You have the list of all matchers there (don't learn all of these, .toBe() is enough): https://jestjs.io/docs/expect#methods
  we choose .toBe() because we want to compare primitives: add() returns a number
  */

  // Try to replace 8 by 10 to cause an error and see what happens.

  // So this is testing, you just test that your function works the way you want and freeze it so that, if there is a change, nothing breaks.
})

test('should not return the substraction of the two numbers provided', () => {
  /*
  Here we are asserting that add(10, 10) ≠ 0
  because what if a new developer refactors the function and mistakenly returns `a - b` in add():
  function add(a: number, b: number) {
    return a - b
  }
  */
  expect(add(10, 10)).not.toBe(0)

  /*
  If you want to know what is .not before the matchers, you can check out https://jestjs.io/docs/expect#not
  But this is simply the way of comparing the opposite of the matchers in Jest.
  */
})
```

</details>

<details>
<summary>Exercises</summary>

1. Substraction function

```tsx
// UPDATE ME
function substract() {}

test('should return the substraction of the two numbers provided', () => {
  // expect(substract()) ???
})

test('should not return the addition of the two numbers provided', () => {
  // expect(substract()) ???
})
```

2. Multiplication function

```tsx
// UPDATE ME
function multiply() {
  return
}

test('should return the multiplication of the two numbers provided' () => {
  // expect(multiply()) ???
})

test('should not return the addition of the two numbers provided', () => {
  // expect(multiply()) ???
})
```

</details>

### 2. How to test a React Component. (render() + .toBeInTheDocument())

- **Jest**/**Vitest** are test runners, what execute tests. (We will be using vitest but it literally is the same, just that vitest is way faster than jest.)

- **React-testing-library** is a jest/vitest library. it allows to render JSX in the "DOM" and querySelect elements in the "DOM" to make assertions with them in the test runner.

<details>
<summary>Lesson</summary>

1. Arrange your test with .render()

```tsx
import { render, screen } from '@testing-library/react'

test('render HTML elements: a checkbox with a label', () => {
  /*
  We first need to render the component. And luckily, react-testing-library provides the API for us: render().
  the argument of render() is gonna be displayed in the DOM just like document.body.innerHTML
  any jsx can be rendered: HTML tags & React Components.
  */
  render(
    <div>
      <input type="checkbox" id="happy" className="my-checkbox-haha" />
      <label htmlFor="happy">Are you happy?</label>
    </div>
  )
  /*
  screen.debug is a method provided by react-testing-library to console.log everything that is currently in the DOM!
  you will see a checkbox with its label in the "DOM" and all of their attributes!
  */
  screen.debug()

  /*
  Now remove <input/> and <label/> from the render above
  Then add something in render() to display a <p/> with any text you want!
  */
})
```

2. Get elements with screen.getBy() and make assertions on them with .toBeInTheDocument()

```tsx
import { render, screen } from '@testing-library/react'

function Header() {
  return (
    <header>
      <h1>Title of the header</h1>
      <p>Little description of my website</p>
    </header>
  )
}

test('should render <Header/> with the title and the description', () => {
  render(<Header />)

  /*
  screen is an API provided by react-testing-library to interract with what's inside the DOM
  .getByText() is a selector that works like querySelector() but allows you to search by text instead of class
  we can get the element by the class or the id but think of tests as if you're a real user.
  A real user would not care about the class but instead see if "Title of the header" appears in the screen.
  */
  const title = screen.getByText('Title of the header')

  // We want the element "Title of the header" to be in the DOM (document)
  expect(title).toBeInTheDocument()
  /*
  Jest/Vitest has built-in matchers (comparateurs) but because jest/vitest is initially used for testing basic JS functions
  @testing-library/jest-dom created matchers to work in jest/vitest, with the DOM
  Think of it like this: Jest is the language (like JS) and Testing-Library is the Framework/Library (like React)
  and one custom matcher provided by jest-dom is .toBeInTheDocument()
  you can see all of them here: https://github.com/testing-library/jest-dom/#table-of-contents
  if you want to check at
  https://jestjs.io/fr/docs/using-matchers
  https://vitest.dev/api/#expect
  *

  /*
  You don't need jest-dom to be honest because you can write it like this:
  expect(title).not.toBeNull()
  But this way of writing your test is less readable and thus less maintainable.


  Another example of a less readable assertion:
  expect(title.textContent).toBe("Title of the header")
  but look at this one: expect(title).toHaveTextContent("Title of the header"), it is more readable.
  */

  /* UNCOMMENT THE 2 LINES BELOW AND FIX ME ;) */
  // const description = screen.getByText("Big description of my website")
  // expect(description).not.toBeInTheDocument()
})
```

</details>

<details>
<summary>Exercises</summary>

1. Create an `<About/>` component and test it. The component will return these 3 elements :

- A title (with the text: "About me")
- A short message (with any text you want)
- A button (with the text: "Thank you")

2. Test that I can display any text content inside the `<Button/>` component

```tsx
import { render, screen } from '@testing-library/react'

function Button({ children }: React.PropsWithChildren<React.ReactNode>) {
  return <button>{children}</button>
}

// Be careful, unit testing is not UI testing. You cannot assert that the component has a particular style.
test('should return a button and display any text I pass as a children', () => {
  // Make this assertion work by writing code above
  expect(button).toBeInTheDocument()

  // Assert that the button has the text content you have provided
})
```

3. Create a `<Title/>` component that will return an `<h1/>` with a default style and test that I can enter any text content inside `<Title/>`, as a children.

4. Test `<List/>` component and with this component I can pass an array as a props that will be displayed individually

```tsx
import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

type Item = {
  id: string
  name: string
}

type ListProps = {
  items: Item[]
}

function List({ items }: ListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

/*
This is a function that uses faker. It helps me create random data to avoid having raw data that will mislead other developers.
And also another benefit of generating random data is that it gives me confidence that my code will work with any data possible.
*/
function generateItem(): Item {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
  }
}

test('should return a list of items: the exact number of items and their names should be displayed', () => {
  const randomItems = [generateItem(), generateItem(), generateItem(), generateItem()]

  render(<List items={randomItems} />)

  // hint: in react-testing-library there is a selector just like querySelectorAll()
  // hint 2: li tags have roles so check .getByRole() selector
  // const allItemsInTheDOM = ???

  /*
  hint: it would be hard to know if exactly every item's name is displayed
  so I would just check if the DOM has the exact same number of items in the array
  check what is the type of itemsInTheDOM (object or array?)
  check if there is a matcher that can look at the number of elements in an array
  */
  expect(allItemsInTheDOM).

  /*
  in the return of <List/>, change items.map by items.slice(0,2).map
  and see notice that the test fails. Try to guess why!
  */

  /*
  Now that we're confident that <List/> returns the right number of items
  we need to make sure that <List/> displays the names of each item provided.
  hint: it would be difficult to check for every item so in this case I'd just check
  that the first item and the last item's rendered by <List/> contain the names provided by items array
  */
  // const firstItemName = ???
  /* here I'd just use allItemsInTheDOM and get the first element! */
  // expect().to

  // Do the same for last item.
})
```

</details>

<details>
<summary>Go further</summary>

- Testing-library urges us developers to code accessible applications. So to select a button element for example, you don't select it with .getByText() but rather with .`getByRole('button', {name: "text content of the button"})`. This has 2 benefits: your code is a11y friendly and you test as if you are a real user: you want the button that has the text : "text content of the button".
- For an input you want to get the element that has the label text. So you want to use `.getByLabelText()`.
- Testing-library provides you a list of selectors you have to use sorted by their priority order. [https://testing-library.com/docs/queries/about#priority](https://testing-library.com/docs/queries/about#priority)
- As you may have noticed in the 4th exercise, I use Faker.js to generate random data. I explain it in the exercise but you can check out [Faker.js website](https://fakerjs.dev/) to see the list of all the API the library provides.

</details>

### 3. How to interact with DOM elements (userEvent)

<details>
<summary>Lesson</summary>

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

type CheckboxProps = {
  label: string
}

function Checkbox({ label }: CheckboxProps) {
  return (
    <div>
      <input type="checkbox" id="my-checkbox" />
      <label htmlFor="my-checkbox">{label}</label>
    </div>
  )
}

test('should render a checkbox with any customised label', () => {
  // arrange everything to make this test pass

  /*
  use .getByLabelText() instead of .getByRole('checkbox') because think like a user.
  The user won't select any random checkbox, it will select the input (checkbox) that has the label text he wants.
  */
  expect(checkbox).toBeInTheDocument()

  /*
  // userEvent is another testing-library package that allows the test to interract with "DOM" elements
  // from the userEvent we want to click on something so we pass the element in the method .click()
  */
  // UNCOMMENT THE LINE BELOW
  // userEvent.click(checkbox)

  /*
  now that we have clicked on the checkbox, we need to make an assertion
  what do you think it will be?
  remember to check jest-dom matchers ;)
  */
  // expect(checkbox). ???
})

test('should render a checkbox with a default value of checked but still be able to toggle between checked/unchecked', () => {
  /*
  update <Checkbox/> to allow a default value to be passed so that I can start the checkbox as checked
  and also allow the user to toggle between checked/unchecked
  */
  // write the test
})
```

</details>

<details>
<summary>Exercises</summary>

1. Create a `<Button/>` component, and test that when the user clicks on the button, that the button is focused.

- Extra: Test that when the user hits `tab`, that the button is focused.

2. Create an `<Input/>` component that will return these 2 elements: `<input type="text"/>` and `<label>Email address</label>`. Test that you can write any email (use faker) inside the input and make an assertion on it. Hint: use `.getByLabelText()` instead of .getByRole(”textbox”) because think of it as a user: you want to get the input that has the label text “Email address”.

- Extra: I can now pass a defaultValue to `<Input/>` so cover this case.
- Extra 2: Write a second test and this time this will test that I can choose the type of the input (this will be a type number) and assert that it works: you can type a number and also test that I cannot enter any text in the input.
- Extra 3: Test that when I click on the label, that the input is focused.

3. Create a `<Form/>` component and test it. `<Form/>` will have these elements: input to enter the country, input to enter the age, radios between Mr. and Mrs. and a submit button.

</details>

<details>
<summary>Go further</summary>

- fireEvent exists but you just need to use userEvent: [https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event)
</details>

### 4. How to test that elements are not in the DOM (queryBy)

<details>
<summary>Lesson</summary>

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'

type StatusType = 'unread' | 'playing' | 'played'

function Player() {
  const [status, setStatus] = React.useState<StatusType>('unread')
  return (
    <>
      <div>
        <button onClick={() => setStatus('playing')}>Play</button>
        <button onClick={() => setStatus('played')}>Done</button>
        <button onClick={() => setStatus('unread')}>Reset</button>
      </div>
      <div>
        {status === 'unread' ? <h1>Unread</h1> : null}
        {status === 'playing' ? <h1>Playing</h1> : null}
        {status === 'played' ? <h1>Played</h1> : null}
      </div>
    </>
  )
}

test('render Player and should show only "unread" text when first mounted', () => {
  render(<Player />)

  /*
  getByText throws an error if it cannot get the text that will cause the test fail and to not continuing.
  Instead what you want to do is use queryByText which will just return null if it cannot select the element and the test can keep on.
  */
  expect(screen.getByText('Playing')).not.toBeInTheDocument()

  /* UNCOMMENT THE LINE BELOW AND FIX ME */
  // const playedMessage = ???
  expect(playedMessage).not.toBeInTheDocument()

  // now check that "unread" is displayed
})
```

</details>

<details>
<summary>Exercises</summary>

1. Reuse `<Player/>` but write test for this one

```tsx
test('render Player and when clicked on “Play” button, should now only show “Playing” text and not show the other 2 messages', () => {})
```

2. Reuse `<Player/>` but write test for this one

```tsx
test('render Player and when clicked on “Done” button, should now only show “Played” text and not show the other 2 messages', () => {})
```

3. Reuse `<Player/>` but write test for this one

```tsx
test('render Player and should only display the right messages when we click on each button', () => {
  // when I click on "Play"
  // this/these thing(s) should be in the DOM
  // this/these thing(s) should not be in the DOM
  // when I click on "Done"
  // this/these thing(s) should be in the DOM
  // this/these thing(s) should not be in the DOM
  // when I click on "Reset"
  // this/these thing(s) should be in the DOM
  // this/these thing(s) should not be in the DOM
})
```

4. Render any random message and assert that any element like a button with the text "Say hi" is not displayed in the DOM

5. Render any random message and assert that any element like a label text with the content "Money money" is not displayed in the DOM

</details>

<details>
<summary>Go further</summary>

- We getBy to get an element that is in the DOM but we only use queryBy to test that an element is not in the DOM [https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-query-variants-for-anything-except-checking-for-non-existence](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-query-variants-for-anything-except-checking-for-non-existence)
</details>

### 5. How to handle async events happening in the DOM (waitFor)

<details>
<summary>Lesson</summary>

```tsx
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function Loader() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // we simulate a loading state that will then be completed 1 second after the mount
    sleep(1000).then(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  return <h1>Completed</h1>
}

test('Loader should display loading completed message when loading is done', async () => {
  render(<Loader />)

  /* 
  here we cannot .getByText('Loading completed') because <Loader/> behaves like this:
  - it waits a second to set loading to false
  - in the meantime while loading is true, "Loading..." is shown
  - and then after 1 second loading is set to false and "Completed" is shown
  so comment the line below and keep on to know how to handle this test case.
  */
  // expect(screen.getByText('Completed')).toBeInTheDocument()

  /*
  react-testing-library provides a useful API: waitFor. This is used in async cases like this, when you need to wait for an assertion to be true.
  here we know that "Completed" will be shown by itself after 1 second. So just wait for the assertion that the element is in the DOM.
  uncomment it and it finally works. Notice waitFor returns a promise so you need to await it.
  */
  await waitFor(() => expect(screen.getByText('Completed')).toBeInTheDocument())
})
```

</details>

<details>
<summary>Exercises</summary>

1. Use `<Loader/>` and test that: "render <Loader/> and show a loading message first and when loading is done, show “Loading completed” message".

2. Same as exercise 1 but this time, this is after we click on the button “Skip loading” that 0.5 seconds later, the confirmation message is being shown.

```tsx
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function LoaderWithSkip() {
  const [isSkipped, setIsSkipped] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const skipLoading = () => setIsSkipped(true)

  React.useEffect(() => {
    if (isSkipped) {
      sleep(500).then(() => setLoading(false))
    }
  }, [isSkipped])

  if (loading)
    return (
      <div>
        <p>Loading...</p>
        <button onClick={skipLoading}>Skip loading</button>
      </div>
    )
  return <h1>Loading completed</h1>
}

test('render LoaderWithSkip, show a loading message and show completed message 0.5s after we click on skip loading button', () => {
  render(<LoaderWithSkip />)
})
```

3. Same as previous exercises but with a different behavior. Look at the useEffect and you can see that sleep.then() is immediately executed on mount and thus 0.5 seconds after the component mounts, loading is set to true and the message is being shown. So write the tests for this specific behavior.

```tsx
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function LoaderWithSkip() {
  const [isSkipped, setIsSkipped] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const skipLoading = () => setIsSkipped(true)

  React.useEffect(() => {
    sleep(500).then(() => setLoading(false))
  }, [isSkipped])

  if (loading)
    return (
      <div>
        <p>Loading...</p>
        <button onClick={skipLoading}>Skip loading</button>
      </div>
    )

  return <h1>Loading completed</h1>
}

test('should display Loading completed 0.5s after the component mounts', () => {
  render(<LoaderWithSkip />)
})
```

4. Here it's exactly the same as exercise 3 but we can abort the loading. Write the test for it.

```tsx
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function LoaderWithAbortion() {
  const [isAborted, setIsAborted] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const abort = () => setIsAborted(true)

  React.useEffect(() => {
    sleep(2000).then(() => {
      if (isAborted) {
        return setLoading(true)
      }
      setLoading(false)
    })
  }, [isAborted])

  if (isAborted) {
    return <p>Aborted</p>
  }
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
        <button onClick={abort}>Abort</button>
      </div>
    )
  }
  return <h1>Loading completed</h1>
}

test('should be able to abort the loading when we click on abort button within 2 seconds', () => {
  render(<LoaderWithAbortion />)
})
```

</details>

<details>
<summary>Go further</summary>

- If you want to wait for disappearance use `waitForElementToBeRemoved`, it works exactly like `waitFor`. [https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance](https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance)
</details>

### 6. How to test when my Component communicate with the backend (mock it with msw)

</p>
<details>

<summary>Lesson</summary>
<p>Unit tests and integration tests must never depend on the real backend. Only E2E tests should. *Find reason.*</p>
<p>
<p>
<a href="https://github.com/mswjs/msw#usage-example">
MSW</a> is a JS library that can be used client side (in the browser) but also server side along with jest/vitest. For the tests we are going to use it server side. MSW will set up a server that will create endpoints (request handlers).
</p>
<p>MSW will act as a middleman. Meaning that your network call is will go to the real backend but msw will intercept it and return the response without your network call having to go to the real backend. You can then control what response to return etc.
</p>

```tsx
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

// we first need to set up the mock server to intercept every requests made by components
const mockServer = setupServer()

// We set up this QueryProvider become we're gonna use react-query
const QueryProvider = ({ children }: { children: React.ReactElement }) => {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

// We create this custom render because we want to avoid using the default render and passing properties to it. It's just for a better UX
// instead we would have this every time: render(<QueryProvider><Component /></QueryProvider>)
// now it's just this call: customRender(<Component />)
const customRender = (ui: React.ReactElement) => render(ui, { wrapper: QueryProvider })

type Article = {
  title: string
  description: string
  date: string
  author: string
}
const backendApi = 'https://mybackend.com/api/top-article'

function ReadTopArticle() {
  // I'm using react-query because it's easier but it works with a simple fetch + useEffect. Don't mind this setup.
  const { status, data } = useQuery<Article>({
    queryKey: 'top-article',
    queryFn: () => fetch(backendApi).then((res) => res.json()),
  })

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'success') {
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.date}</p>
        <p>{data.description}</p>
        <p>{data.author}</p>
      </div>
    )
  }
  return null
}

// before the test is run we must start the server.
beforeAll(() => mockServer.listen())

// after each test we must clean up the interceptors.
afterEach(() => mockServer.resetHandlers())

// after all tests are done we must close the server to avoid memory leak and conflict we other tests.
afterAll(() => mockServer.close())

test('render ReadTopArticle that fetches the backend and display the article with the right data sent by the backend', async () => {
  // I'd use faker to generate a random article but this is not the goal of this learning module.
  const dataSentByBackend = {
    title: 'Macron is reelected!!',
    description:
      'After a fight between Zemmour and Macron, Macron finally KOed his opponent with a powerful punch',
    date: '2022-05-10',
    author: 'Melenchon',
  }

  // mockServer.use is a middleware that intercepts all requests and returns the data sent by the backend.
  mockServer.use(
    // le backend va return un truc qui a cette gueule
    // you pass this rest.get() with the url you want to intercept and the data you want to return.
    rest.get(backendApi, (req, res, ctx) => {
      return res(ctx.json(dataSentByBackend))
    })
  )

  customRender(<ReadTopArticle />)

  // The component is getting the data so Loading... is displayed. You can verify by uncommenting screen.debug()
  // screen.debug()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
  // We have waited for Loading... to be removed so it means the data is fetched and displayed. You can verify by uncommenting screen.debug()
  // screen.debug()

  /* 
  And now we can make our assertions about our dataSentByBackend.
  Assert that:
  - the title is the same as the one sent by the backend
  - the description is the same as the one sent by the backend
  - the date is the same as the one sent by the backend
  - the author is the same as the one sent by the backend
  */
})
```

</details>

<details>
<summary>Exercises</summary>

1. Use this `<User/>` component that will fetch the backend and create a request handler with msw to mock the return of the server to return user data.

```tsx
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const mockServer = setupServer()
beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

const QueryProvider = ({ children }: { children: React.ReactElement }) => {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

const customRender = (ui: React.ReactElement) => render(ui, { wrapper: QueryProvider })

type User = {
  name: string
  age: number
  url: string
  bio: string
}
const backendApi = 'https://mybackend.com/api/user'

function User() {
  const { status, data } = useQuery<User>({
    queryKey: 'user',
    queryFn: () => fetch(backendApi).then((res) => res.json()),
  })

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'success') {
    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.age}</p>
        <p>{data.url}</p>
        <p>{data.bio}</p>
      </div>
    )
  }
  return null
}

test('render ReadTopArticle that fetches the backend and display the article with the right data sent by the backend', async () => {
  customRender(<Users />)
})
```

2. Handle an error. Use the code snippet below with a new component that handles errors. I want you to cover another edge case, when the backend sends an error.

```tsx
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const mockServer = setupServer()
beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

const QueryProvider = ({ children }: { children: React.ReactElement }) => {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

const customRender = (ui: React.ReactElement) => render(ui, { wrapper: QueryProvider })

type Blah = {
  name: string
  age: number
  url: string
  bio: string
}
const backendApi = 'https://mybackend.com/api/user'

function User() {
  const { status, data, error } = useQuery<User>({
    queryKey: 'user',
    queryFn: () => fetch(backendApi).then((res) => res.json()),
  })

  if (status === 'error') return <p>{error}</p>
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'success') {
    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.age}</p>
        <p>{data.url}</p>
        <p>{data.bio}</p>
      </div>
    )
  }
  return null
}

test('render ReadTopArticle that fetches the backend and display the article with the right data sent by the backend', async () => {
  customRender(<Users />)
})
```

</details>
<details>
<summary>Go further</summary>

- Because creating a server on every test files and listening to the server beforeAll and cleaning up afterEach is tedious, you want to call the server in a separate file, handle the server in `setupFiles.ts` and only import `server` from the separate file. Look at `setupFiles.ts` and `server.ts` for an example.

- [https://mswjs.io/docs/api/response](https://mswjs.io/docs/api/response)

- [https://mswjs.io/docs/api/context/json](https://mswjs.io/docs/api/context/json)

</details>
