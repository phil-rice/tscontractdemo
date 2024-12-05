// src/components/HelloWorld.tsx
import React, {useEffect, useState} from 'react';
import {HelloWorldFn, useHelloWorld} from "./hello.world.fn";

type HelloWorldProps = {
    apiUrl: string;
};
export const HelloWorld: React.FC<HelloWorldProps> = ({apiUrl}) => {
    const [message, setMessage] = useState<string | null>(null);
    const helloWorldFn:HelloWorldFn = useHelloWorld();
    useEffect(() => {
        helloWorldFn(apiUrl)
            .then(setMessage)
            .catch((err) => console.error('Error fetching message:', err));
    }, [apiUrl]);

    return <div>{message || 'Loading...'}</div>;
};

