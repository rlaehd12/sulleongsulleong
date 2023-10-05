import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<div id="app">
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</div>,
);
