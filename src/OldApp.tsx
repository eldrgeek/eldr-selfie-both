import * as React from 'react';
import { Box, Container, Button, Image } from '@chakra-ui/react';
import Webcam from 'react-webcam';
import DragButton from './DragButton';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { getOriginalNode } from 'typescript';
import html2canvas from 'html2canvas';
const App = () => {
	console.log('origin is', origin);
	const ref = React.createRef();
	// const [image, takeScreenShot] = useScreenshot({
	//   type: "image/jpeg",
	//   quality: 1.0
	// });
	const webcamRef = React.useRef<Webcam>(null);
	const [imgSrc, setImgSrc] = React.useState(null);
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	const Text = () => {
		return <h1>this is a heading </h1>;
	};
	const [image, takeScreenShot] = useScreenshot();
	// const ref = React.createRef(null);
	const getImage = () => takeScreenShot(ref.current);

	const Getter = () => {
		return (
			<div>
				<div>
					<button style={{ marginBottom: '10px' }} onClick={getImage}>
						Take screenshot
					</button>
				</div>
				<img width={100} src={image} alt={'ScreenShot'} />
				<div
					ref={ref}
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						marginTop: '20px'
					}}
				>
					<Text />
				</div>
			</div>
		);
	};
	const convToCanvas = () => {
		if (ref && ref.current) {
			html2canvas(ref.current, {
				// canvas: canvas,
				allowTaint: true,
				useCORS: true
			}).then((canvas) => {
				console.log('got canvas');
				const dataURL = canvas.toDataURL();
				setImgSrc(dataURL);
				//https://html2canvas.hertzen.com/getting-started
			});
		}
	};
	const capture = () => {
		console.log('callback');
		if (!image && webcamRef && webcamRef.current && ref && ref.current) {
			// const imageSrc: any = webcamRef?.current?.getScreenshot();
			console.log('take screenshot');
			console.log(ref.current);
			takeScreenShot(ref.current);
			console.log('took screenshot', image);
		}
	};
	React.useEffect(() => {
		console.log('use effect', image);
		// if (image) {
		//   console.log("set image");
		//   setImgSrc(image);
		// }
	}, [image]);
	console.log('W', document.body.clientHeight);
	return (
		<div>
			<div>
				<div>
					<button style={{ marginBottom: '10px' }} onClick={convToCanvas}>
						Take screenshot
					</button>
				</div>
				<img width={200} src={image} alt={'ScreenShot'} />
				{/* <div
					ref={ref}
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						marginTop: '20px'
					}}
				>
					<Text />
					
					<DragButton
						position={{ x: document.body.clientWidth - 100, y: 0 }}
						setPosition={setPosition}
					/>
				</div> */}
			</div>
			<Box bg="green" w="100%" bg="gray">
				<div
					height="500px"
					ref={ref}
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						marginTop: '20px'
					}}
				>
					{/* <DragButton
					position={{ x: document.body.clientWidth - 100, y: 0 }}
					setPosition={setPosition}
				/> */}
					<Container height="200px" bg="red" w="100%" position="fixed">
						{!imgSrc ? (
							<Container>
								<DragButton setPosition={null} position={position} />

								{/* <AspectRatio ratio={16 / 9} maxW="1000"> */}
								<Webcam
									videoConstraints={{
										// width: "10px",
										// height: "10px",
										facingMode: 'user'
									}}
									// width="100%"
									audio={false}
									ref={webcamRef}
									screenshotFormat="image/jpeg"
								/>
								{/* </AspectRatio> */}
								<Button my="2" border="1px solid black" onClick={capture}>
									Capture photo
								</Button>
							</Container>
						) : (
							<Container>
								<Image height="200px" alt="selfie" src={imgSrc || ''} />
								<Button
									mx="auto"
									my="2"
									border="1px solid black"
									onClick={() => setImgSrc(null)}
								>
									Reset
								</Button>
							</Container>
						)}
					</Container>
				</div>
			</Box>
		</div>
	);
};
export default App;
