### Learn unit testing in JS and React (workshop)

Hello this is my workshop to teach you how to learn unit testing (JS & React)

### Requirements:

- git clone this project
- go inside the folder
- run `npm install`
- run `npm run test:watch`
- from now on you can follow the workshop and you’ll just need to copy and paste the code examples in the `learn-unit-testing.test.tsx` file.

## 1. How to test basic JS functions.

<details>
<summary>Lesson</summary>

```typescript
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

```typescript
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

```typescript
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

## 2. How to test a React Component. (render() + .toBeInTheDocument())

- **Jest** is the test runner, what allows the tests to be executed.

- **React-testing-library** is a jest library. it allows to render JSX in the "DOM" and querySelect elements in the "DOM" to make assertions with jest.

<details>
<summary>Lesson</summary>

1. Arrange your test with .render()

```typescript
import { render, screen } from '@utils/test/app-test-utils'

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

```typescript
import { render, screen } from '@utils/test/app-test-utils'

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
  Jest has built-in matchers (comparateurs) but because jest is initially used for testing basic JS functions
  @testing-library/jest-dom created matchers to work in jest, with the DOM
  Think of it like this: Jest is the language (like JS) and Testing-Library is the Framework/Library (like React)
  and one custom matcher provided by jest-dom is .toBeInTheDocument()
  you can see all of them here: https://github.com/testing-library/jest-dom/#table-of-contents
  if you want to check at
  https://jestjs.io/fr/docs/using-matchers
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

```typescript
import { render, screen } from '@utils/test/app-test-utils'

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

```typescript
import { render, screen } from '@utils/test/app-test-utils'
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
