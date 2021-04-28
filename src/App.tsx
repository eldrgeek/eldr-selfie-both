import React, { createRef } from 'react';
import Webcam from 'react-webcam';
import { Flex, Stack, Button, Text, Box } from '@chakra-ui/react';

import html2canvas from 'html2canvas';
// import Text from './Text';
import DragButton from './DragButton';
// import { useScreenshot } from 'use-react-screenshot';

export default () => {
	const ref = createRef();
	const webcamRef = React.useRef<Webcam>(null);

	// const [width, setWidth] = useState(300);
	const [position, setPosition] = React.useState({ x: 300, y: 200 });
	const [screenShot, setScreenShot] = React.useState(null);
	const [snapShot, setSnapshot] = React.useState(null);

	// const [screenShot, takeScreenShot] = useScreenshot();
	const getImage = () => {
		console.log('Taking screenshot');
		//@ts-ignore
		const imageSrc = webcamRef.current.getScreenshot();
		//@ts-ignore
		setSnapshot(imageSrc);
	};

	const convToCanvas = () => {
		console.log('Conv to canvas');
		//@ts-ignore
		html2canvas(ref.current, {
			// canvas: canvas,
			allowTaint: true,
			useCORS: true
		}).then((canvas) => {
			console.log('got canvas');
			const dataURL = canvas.toDataURL();
			///@ts-ignore
			setScreenShot(dataURL);
			//https://html2canvas.hertzen.com/getting-started
		});
	};
	React.useEffect(() => {
		if (snapShot) {
			convToCanvas();
		}
		//@ts-ignore
	}, [snapShot]); // eslint-disable-line
	return (
		<Box mx="auto" maxW="500">
			<div>
				{/* <canvas id="canvas" height="100px" width="400px" /> */}
				{!screenShot && (
					<Flex color="black">
						<Box p={4} flex="1" bg="green.100">
							<Stack bg="green.100">
								<Text fontSize="l">Drag button to move</Text>
								<Text fontSize="l">Drag red dot to resize</Text>
							</Stack>
						</Box>
						<Box flex="1">
							<Button
								// mx="auto"
								m="2"
								border="1px solid black"
								onClick={getImage}
							>
								Click to take screenshot
							</Button>
						</Box>
					</Flex>
				)}
				{screenShot && (
					<Button
						mx="auto"
						my="2"
						border="1px solid black"
						onClick={() => {
							// console.log('screenshot', image);
							setSnapshot(null);
							setScreenShot(null);
						}}
					>
						Reset
					</Button>
				)}
				{screenShot && (
					<Button
						mx="auto"
						my="2"
						border="1px solid black"
						onClick={() => alert('coming soon')}
					>
						Upload
					</Button>
				)}
				{/* <label style={{ display: 'block', margin: '10px 0' }}>
					Width:
					<input value={width} onChange={(e) => setWidth(e.target.value)} />
				</label> */}
			</div>
			{screenShot && (
				<img
					crossOrigin="anonymous"
					width={'100%'}
					src={screenShot || ''}
					alt={'ScreenShot'}
				/>
			)}
			{
				//@ts-ignore

				<div ref={ref}>
					{snapShot && (
						<img
							crossOrigin="anonymous"
							width={'100%'}
							src={snapShot || ''}
							alt={'ScreenShot'}
						/>
					)}
					{!screenShot && (
						<DragButton setPosition={setPosition} position={position} />
					)}
					{!screenShot && (
						<Webcam
							videoConstraints={{
								// width: "10px",
								// height: "10px",
								facingMode: 'user'
							}}
							// width="100%"
							audio={false}
							ref={webcamRef}
							width={'100%'}
							screenshotFormat="image/jpeg"
						/>
					)}
				</div>
			}
		</Box>
	);
};
