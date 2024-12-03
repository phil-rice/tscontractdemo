import {httpServer} from "./server";

// Start the server
const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

