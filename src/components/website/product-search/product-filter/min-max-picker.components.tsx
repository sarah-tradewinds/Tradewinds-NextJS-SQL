import { useKeenSlider } from 'keen-slider/react';
import { generateListByCount } from 'utils/common.util';

interface MinMaxPickerProps {
	minStart: number;
	minEnd: number;
	maxStart: number;
	maxEnd: number;
}

const MinMaxPicker: React.FC<MinMaxPickerProps> = (props) => {
	const { minStart, minEnd } = props;

	const [sliderRefMin] = useKeenSlider(
		{
			// slideChanged: (s) => {
			// 	console.log(
			// 		'[slideChanged]',
			// 		s,
			// 		s.track.details.rel,
			// 		s.track.details.abs
			// 	);
			// },
			animationEnded: (s) => {
				console.log(
					'[animationEnded]',
					s,
					s.track.details.rel,
					s.track.details.abs
				);
			},
			animationStopped: (s) => {
				console.log(
					'[animationStopped]',
					s,
					s.track.details.rel,
					s.track.details.abs
				);
			},

			slides: {
				origin: 'center',
				perView: 4
			},
			vertical: true,
			mode: 'free-snap'
		},
		[
			// add plugins here
		]
	);

	const [sliderRefMax] = useKeenSlider(
		{
			animationEnded: (s) => {
				console.log(
					'[animationEnded]',
					s,
					s.track.details.rel,
					s.track.details.abs
				);
			},
			animationStopped: (s) => {
				console.log(
					'[animationStopped]',
					s,
					s.track.details.rel,
					s.track.details.abs
				);
			},

			slides: {
				origin: 'center',
				perView: 4
			},
			vertical: true,
			mode: 'free-snap'
		},
		[
			// add plugins here
		]
	);

	const list = [];
	for (let i = 1; i <= 100; i++) {
		list.push(i);
	}

	return (
		<div className="relative h-full w-full bg-black">
			<div className="absolute top-16 h-8 w-full border-y border-white"></div>
			<div className="flex h-full w-full justify-center space-x-4">
				<div className={'keen-slider h-full !w-8'} ref={sliderRefMin}>
					{generateListByCount(0, props.minStart, props.minEnd).map(
						(count) => (
							<div
								key={count}
								className="keen-slider__slide text-center text-white"
							>
								{count}
							</div>
						)
					)}
				</div>

				<div className={'keen-slider h-full !w-8'} ref={sliderRefMax}>
					{generateListByCount(0, props.maxStart, props.maxEnd).map(
						(count) => (
							<div
								key={count}
								defaultValue={count}
								className="keen-slider__slide text-center text-white"
							>
								{count}
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}; // End of MinMaxPicker

export default MinMaxPicker;
