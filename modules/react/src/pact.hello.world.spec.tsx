import React from 'react';
import {render, screen, waitFor,} from '@testing-library/react';
import {HelloWorldContext, HelloWorldFn} from "./hello.world.fn";
import {HelloWorld} from "./pact.hello.world";
import '@testing-library/jest-dom'; // For matchers like `toBeInTheDocument`

describe('HelloWorld Component', () => {
    it('renders "Loading..." while the promise is unresolved', () => {
        // A promise that never resolves
        const unresolvedPromise: HelloWorldFn = () => new Promise(() => {});

        render(
            <HelloWorldContext.Provider value={unresolvedPromise}>
                <HelloWorld apiUrl="http://mock-api.com"/>
            </HelloWorldContext.Provider>
        );

        // Assert the initial state
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the fetched message when the promise resolves', async () => {
        // A promise that resolves with the desired message
        const resolvedPromise: HelloWorldFn = async () => 'Hello, Test World!';

        render(
            <HelloWorldContext.Provider value={resolvedPromise}>
                <HelloWorld apiUrl="http://mock-api.com"/>
            </HelloWorldContext.Provider>
        );

        // Wait for the message to be rendered
        await waitFor(() => expect(screen.getByText('Hello, Test World!')).toBeInTheDocument());
    });

    it('renders "Loading..." when the promise is rejected', async () => {
        // A promise that rejects with an error
        const rejectedPromise: HelloWorldFn = async () => {
            throw new Error('Mock API Error');
        };

        render(
            <HelloWorldContext.Provider value={rejectedPromise}>
                <HelloWorld apiUrl="http://mock-api.com"/>
            </HelloWorldContext.Provider>
        );

        // Wait for the component to handle the rejected promise
        await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    });
});
