import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './theme';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();

root.render(
	<div id="app">
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ThemeProvider>
	</div>,
);
