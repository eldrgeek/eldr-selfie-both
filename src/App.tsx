import React, { createRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, Container, Button, Image } from '@chakra-ui/react';

import html2canvas from 'html2canvas';
import Text from './Text';
import DragButton from './DragButton';
// import { useScreenshot } from 'use-react-screenshot';

export default () => {
	const ref = createRef(null);
	const webcamRef = React.useRef<Webcam>(null);

	const [width, setWidth] = useState(300);
	const [screenShot, setScreenShot] = React.useState(null);
	const [snapShot, setSnapshot] = React.useState(null);

	// const [screenShot, takeScreenShot] = useScreenshot();
	const getImage = () => {
		console.log('Taking screenshot');
		const imageSrc = webcamRef.current.getScreenshot();
		setSnapshot(imageSrc);
	};

	const convToCanvas = () => {
		console.log('Conv to canvas');
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
		console.log('screenshotChange');
		if (snapShot) {
			convToCanvas();
		}
		//@ts-ignore
	}, [snapShot]); // eslint-disable-line
	return (
		<div>
			<div>
				{/* <canvas id="canvas" height="100px" width="400px" /> */}
				<button style={{ marginBottom: '10px' }} onClick={getImage}>
					Take screenshot
				</button>
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
				{/* <label style={{ display: 'block', margin: '10px 0' }}>
					Width:
					<input value={width} onChange={(e) => setWidth(e.target.value)} />
				</label> */}
			</div>
			{screenShot && (
				<img
					crossOrigin="Anonymous"
					width={'100%'}
					src={screenShot}
					alt={'ScreenShot'}
				/>
			)}

			<div
				ref={ref}
				style={{
					border: '1px solid #ccc',
					padding: '10px',
					marginTop: '20px'
				}}
			>
				{snapShot && (
					<img
						crossOrigin="Anonymous"
						width={'100%'}
						src={snapShot}
						alt={'ScreenShot'}
					/>
				)}
				{!screenShot && (
					<DragButton setPosition={null} position={{ x: 0, y: 0 }} />
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
		</div>
	);
};
