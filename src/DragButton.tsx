import * as React from 'react';
import { Image, Box } from '@chakra-ui/react';
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
};
//{any,{x:number, y:number}
//@ts-ignore
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
			position={position}
			onDragStop={(e, d) => {
				setPosition({ x: d.x, y: d.y });
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
			<Box
				position="fixed"
				right={0}
				bottom={0}
				h={2}
				w={2}
				bg="red"
				zIndex={10}
			></Box>
		</Rnd>
	);
}
export default RevButton;
