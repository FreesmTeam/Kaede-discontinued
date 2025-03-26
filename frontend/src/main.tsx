import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/style.css';
import App from '@/App';
import WindowHeader from '@/components/UI/WindowHeader/WindowHeader';

const container = document.getElementById('root');
const windowHeader = document.getElementById('windowHeader');

const root = createRoot(container!);
const headerRoot = createRoot(windowHeader!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

headerRoot.render(
    <React.StrictMode>
        <WindowHeader />
    </React.StrictMode>,
);