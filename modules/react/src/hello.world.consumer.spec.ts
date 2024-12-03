import { Pact } from "@pact-foundation/pact";
import path from "path";
import {defaultHelloWorldFn} from "./hello.world.fn";

const provider = new Pact({
    consumer: "ReactHelloWorldConsumer",
    provider: "HelloWorldAPIProvider",
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "info",
});

describe("Consumer Pact Test for defaultHelloWorldFn", () => {
    const apiUrl = "http://localhost:1234";

    beforeAll(() => provider.setup()); // Start the Pact mock server
    afterAll(() => provider.finalize()); // Generate the Pact file
    afterEach(() => provider.verify()); // Verify that all interactions occurred

    it("should fetch the Hello World message from the API", async () => {
        // Define the expected interaction with the provider
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

        // Call the function we are testing
        const result = await defaultHelloWorldFn(apiUrl);

        // Assert that the result matches the expected message
        expect(result).toEqual("Hello, World!");
    });
});
