
# Consumer-Driven Contract Testing with Pact

This repository is a demo project for a training course on **consumer-driven contract testing** using [Pact](https://pact.io). 
It demonstrates how to write and validate contracts between a **React consumer** and an **Express API provider**.

---

## Installation

Clone the repository:
```bash
git clone https://github.com/phil-rice/tscontractdemo.git
```

---

## Starting the Applications

### 1. Start the API Provider
Navigate to the server module, install dependencies, and start the API:
```bash
cd modules/server
yarn # Run this the first time to install dependencies
yarn start
# Test the endpoint with a browser or curl:
curl http://localhost:3000/hello
```

### 2. Start the React Consumer
Navigate to the React module, install dependencies, and start the consumer:
```bash
cd modules/react
yarn # Run this the first time to install dependencies
yarn start
# Open the browser and navigate to:
http://localhost:1234
```

---

## React Code Overview

### `HelloWorld` Component
The `HelloWorld` component fetches data from an API and displays it:
```tsx
type HelloWorldProps = {
    apiUrl: string;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({ apiUrl }) => {
    const [message, setMessage] = useState<string | null>(null);
    const helloWorldFn = useHelloWorld();

    useEffect(() => {
        helloWorldFn(apiUrl)
            .then(setMessage)
            .catch((err) => console.error('Error fetching message:', err));
    }, [apiUrl]);

    return <div>{message || 'Loading...'}</div>;
};
```

This component depends on the `helloWorldFn` function, which performs the actual API call.

### `helloWorldFn`
The function fetches the "Hello, World!" message from the API:
```tsx
export const defaultHelloWorldFn: HelloWorldFn = async (apiUrl: string) => {
    const response = await fetch(`${apiUrl}/hello`);
    const data = await response.json();
    return data.message;
};
```

While we can test this function by mocking its behavior, we use Pact to ensure it works correctly with the actual API.

---

## Pact Testing (Consumer Side)

### Defining Expectations
Pact allows us to define interactions, specifying what we expect from the API:
```ts
await provider.addInteraction({
    state: "a Hello World message exists",
    uponReceiving: "a GET request to /hello",
    withRequest: {
        method: "GET",
        path: "/hello",
    },
    willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { message: "Hello, World!" },
    },
});
```

### Consumer Test
We then test that `helloWorldFn` behaves correctly with the mock provider:
```ts
const message = await helloWorldFn(provider.mockService.baseUrl);
expect(message).toEqual("Hello, World!");
```

This test ensures the consumer can work as long as the server adheres to this contract.

---

## Pact Contract

When the consumer test runs, Pact generates a contract file in the `pacts/` directory. This file describes all the interactions the consumer expects from the provider.

---

## Provider Verification

Over time, APIs change. To ensure the provider adheres to the consumer’s expectations, we use **provider verification tests**.

### Verifying the Provider
The provider test uses Pact to load the contract and test the provider's behavior:
```ts
await new Verifier(opts).verifyProvider().then((output) => {
    console.log("Pact Verification Complete!");
    console.log(output);
});
```

### Running the Verification
The test ensures that for every interaction in the Pact contract, the provider behaves as expected.

---

## Summary

This demo demonstrates the lifecycle of consumer-driven contract testing:
1. Define expectations in the **consumer test**.
2. Generate a Pact contract to describe the interactions.
3. Validate the **provider** against the Pact contract to ensure compatibility.

By following this process, we can ensure that changes to the provider do not break the consumer, and vice versa.
# Consumer-Driven Contract Testing with Pact

This repository is a demo project for a training course on **consumer-driven contract testing** using [Pact](https://pact.io). It demonstrates how to write and validate contracts between a **React consumer** and an **Express API provider**.

---

## Installation

Clone the repository:
```bash
git clone https://github.com/phil-rice/tscontractdemo.git
```

---

## Starting the Applications

### 1. Start the API Provider
Navigate to the server module, install dependencies, and start the API:
```bash
cd modules/server
yarn # Run this the first time to install dependencies
yarn start
# Test the endpoint with a browser or curl:
curl http://localhost:3000/hello
```

### 2. Start the React Consumer
Navigate to the React module, install dependencies, and start the consumer:
```bash
cd modules/react
yarn # Run this the first time to install dependencies
yarn start
# Open the browser and navigate to:
http://localhost:1234
```

---

## React Code Overview

### `HelloWorld` Component
The `HelloWorld` component fetches data from an API and displays it:
```tsx
type HelloWorldProps = {
    apiUrl: string;
};

export const HelloWorld: React.FC<HelloWorldProps> = ({ apiUrl }) => {
    const [message, setMessage] = useState<string | null>(null);
    const helloWorldFn = useHelloWorld();

    useEffect(() => {
        helloWorldFn(apiUrl)
            .then(setMessage)
            .catch((err) => console.error('Error fetching message:', err));
    }, [apiUrl]);

    return <div>{message || 'Loading...'}</div>;
};
```

This component depends on the `helloWorldFn` function, which performs the actual API call.

### `helloWorldFn`
The function fetches the "Hello, World!" message from the API:
```tsx
export const defaultHelloWorldFn: HelloWorldFn = async (apiUrl: string) => {
    const response = await fetch(`${apiUrl}/hello`);
    const data = await response.json();
    return data.message;
};
```

While we can test this function by mocking its behavior, we use Pact to ensure it works correctly with the actual API.

---

## Pact Testing (Consumer Side)

### Defining Expectations
Pact allows us to define interactions, specifying what we expect from the API:
```ts
await provider.addInteraction({
    state: "a Hello World message exists",
    uponReceiving: "a GET request to /hello",
    withRequest: {
        method: "GET",
        path: "/hello",
    },
    willRespondWith: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { message: "Hello, World!" },
    },
});
```

### Consumer Test
We then test that `helloWorldFn` behaves correctly with the mock provider:
```ts
const message = await helloWorldFn(provider.mockService.baseUrl);
expect(message).toEqual("Hello, World!");
```

This test ensures the consumer can work as long as the server adheres to this contract.

---

## Pact Contract

When the consumer test runs, Pact generates a contract file in the `pacts/` directory. This file describes all the interactions the consumer expects from the provider.

---

## Provider Verification

Over time, APIs change. To ensure the provider adheres to the consumer’s expectations, we use **provider verification tests**.

### Verifying the Provider
The provider test uses Pact to load the contract and test the provider's behavior:
```ts
await new Verifier(opts).verifyProvider().then((output) => {
    console.log("Pact Verification Complete!");
    console.log(output);
});
```

### Running the Verification
The test ensures that for every interaction in the Pact contract, the provider behaves as expected.

---

## Summary

This demo demonstrates the lifecycle of consumer-driven contract testing:
1. Define expectations in the **consumer test**.
2. Generate a Pact contract to describe the interactions.
3. Validate the **provider** against the Pact contract to ensure compatibility.

