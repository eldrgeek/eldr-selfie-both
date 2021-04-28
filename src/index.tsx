import * as React from 'react';
import { render } from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
const theme = extendTheme({
	styles: {
		global: {
			// styles for the `body`
			video: {
				// width: '100%',
				maxWidth: 'none'
			}
			// styles for the `a`
		}
	}
});
const Root = () => {
	return (
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	);
};

const rootElement = document.getElementById('root');
render(<Root />, rootElement);
