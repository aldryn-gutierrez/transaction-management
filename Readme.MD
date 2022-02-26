# Transaction Management Fullstack

Your task is to **build a fullstack app** that **fulfills the [Transaction Management]** and **make the provided E2E tests pass**.

Backend to Use Python/.NET Core and Frontend React/Angular

Here's how the frontend could look:

![Mockup](https://user-images.githubusercontent.com/1162212/116609549-cbf29b80-a934-11eb-876e-6d5c20061f13.png)

Feel free to tweak the UI, but please ensure that the following HTML is in place.

#### The form for submitting transactions

```html
<form ... >
  <input data-type="account-id" ... />
  <input data-type="amount" ... />
  <input data-type="transaction-submit" type="submit" ... />
</form>
```

Both input **fields should be cleared** after the form is submitted.

#### The transaction list

Every new transaction goes on **the top of the list** and should have an enclosing `<div />` with the following structure:

```html
<div 
     data-type="transaction"
     data-account-id="${transaction-account-id}"
     data-amount="${transaction-amount}"
     data-balance="${current-account-balance}" ...>
  ...
</div>
```

- `${transaction-account-id}` - account id of the corresponding transaction.
- `${transaction-amount}` - transaction amount.
- `${current-account-balance}` - the current account balance right after submitting the transaction (only needed to be initialized for the transactions submitted from the current client).

## Before you get started

### Import boilerplate

Use the boilerplate code for your tech stack to configure a minimal setup for run`ning the E2E tests.

<details>
<summary>Alternatively, use the manual setup.</summary>

1. Update the `baseUrl` (where your frontend runs) in [cypress.json](cypress.json).
2. Update the `apiUrl` (where your backend runs) in [cypress.json](cypress.json).
3. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app.

</details>

### Get familiar with the API
Use swagger file to understand the API documentation.
Copy paste the [swagger.json](swagger.json) in https://editor.swagger.io/

### Try running the E2E tests locally

```bash
npm install
npm run build # should build your fullstack app
npm run start # should start your fullstack app
npm run test
```

## What we expect from you

1. Make the provided E2E tests pass.
2. Keep server data in memory.
3. Implement client-side validation of the form data.
4. Ensure that the frontend app remains responsive while the data is being loaded from the server.
5. Unit test one module of choice. There is no need to test the whole app, as we only want to understand what you take into consideration when writing unit tests.
6. Avoid duplication and extract re-usable modules where it makes sense. We want to see your approach to creating a codebase that is easy to maintain.
7. Push your code to the new `implementation` branch. We encourage you to commit and push your changes regularly as it's a good way for you to showcase your thinking process.
8. Create a new pull request, but please **do not merge it**.
9. Document the tech decisions you've made by creating a new review on your PR. In particular, describe how you've made the frontend responsive.
10. Await further instructions from the hiring team.


## Time estimate

About **2 days**.

---


