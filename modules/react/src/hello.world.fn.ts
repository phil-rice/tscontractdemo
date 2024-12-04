import axios from "axios";
import React from "react";


export type HelloWorldFn = (apiUrl: string) => Promise<string>
export const defaultHelloWorldFn: HelloWorldFn = async (apiUrl: string) => {
    const response = await axios.get(`${apiUrl}/hello`);
    return response.data.message;
};

export const HelloWorldContext = React.createContext(defaultHelloWorldFn);

export function useHelloWorld(): HelloWorldFn {
    return React.useContext(HelloWorldContext);
}
