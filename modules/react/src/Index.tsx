import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelloWorld} from "./pact.hello.world";

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(<HelloWorld apiUrl="http://localhost:3000"/>);
