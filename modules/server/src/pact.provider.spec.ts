import path from "path";
import {Verifier, VerifierOptions} from "@pact-foundation/pact";
import {httpServer} from "./server";

describe("Pact Provider Verification", () => {

    // Start the Express server before verification
    beforeAll((done) => {
        httpServer.listen(3000, () => {
            console.log("Provider server running on http://localhost:3000");
            done();
        });
    });

    // Stop the server after verification
    afterAll((done) => {
        httpServer.close(() => {
            done();
        });
    });

    it("validates the provider against the Pact file", async () => {
        const pactFile = path.resolve(process.cwd(), "acceptedPacts", "reacthelloworldconsumer-helloworldapiprovider.json");

        const opts: VerifierOptions = {
            provider: "HelloWorldAPIProvider",
            providerBaseUrl: "http://localhost:3000",
            pactUrls: [pactFile],
            logLevel: "info",
        };

        await new Verifier(opts).verifyProvider().then((output) => {
            console.log("Pact Verification Complete!");
            console.log(output);
        });
    });
});
