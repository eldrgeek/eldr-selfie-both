import * as React from 'react';
import { Image, Container } from '@chakra-ui/react';
import { Rnd } from 'react-rnd';
// type Merge<P, T> = Omit<P, keyof T> & T;
// type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;
const style = {
	zIndex: 10,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#f0f0f0',
	borderRadius: '100%'
} as const;
function RevButton({ setPosition, position }) {
	return (
		<Rnd
			style={style}
			default={{
				x: 0,
				y: 0,
				width: 100,
				height: 100
			}}
		>
			<Image
				draggable="false"
				pointerEvents="none"
				// alignObject="center"
				width="auto"
				minWidth="100%"
				// height="auto"
				// minHeight="100%"
				borderRadius="full"
				border="6px solid black"
				objectFit="contain"
				crossOrigin="anonymous"
				// src="./button.png"
				src="https://i.imgur.com/PCjRzZV.jpg"
			/>
		</Rnd>
	);
}
export default RevButton;
