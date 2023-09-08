import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="681159939854-mbkio13ft80rtf962te4vj5ni8mhgh1c.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>,
);
