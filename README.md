# Learn testing in JS and React (workshop)

Hello this is my workshop to teach you how to learn testing (JS & React)

## Requirements:

- git clone this project: `git clone https://github.com/tonykhaov/learn-testing-workshop.git`
- go inside the folder: `cd learn-testing-workshop`
- run `npm install`
- run `npm run test:watch`
- from now on you can follow the workshop and you’ll just need to copy and paste the code examples in the `learn-testing-workshop.test.tsx` file.

# 1. How to test basic JS functions

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
