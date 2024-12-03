import React from "react";


export type HelloWorldFn = (apiUrl: string) => Promise<string>
export const defaultHelloWorldFn: HelloWorldFn = async (apiUrl: string) => {
    const response = await fetch(`${apiUrl}/hello`)
    const data = await response.json();
    return data.message;
}

export const HelloWorldContext = React.createContext(defaultHelloWorldFn);

export function useHelloWorld(): HelloWorldFn {
    return React.useContext(HelloWorldContext);
}
