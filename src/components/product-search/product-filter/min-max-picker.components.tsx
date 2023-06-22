import { useKeenSlider } from 'keen-slider/react';
import { generateListByCount } from 'utils/common.util';

interface MinMaxPickerProps {
	minStart: number;
	minEnd: number;
	maxStart: number;
	maxEnd: number;
	className?: string;
	onMinChange?: (value: number) => void;
	onMaxChange?: (value: number) => void;
}

const MinMaxPicker: React.FC<MinMaxPickerProps> = (props) => {
	const {
		minStart,
		minEnd,
		maxStart,
		maxEnd,
		className,
		onMinChange,
		onMaxChange
	} = props;

	const minStartEndList =
		generateListByCount(0, minStart, minEnd) || [];
	const maxStartEndList =
		generateListByCount(0, maxStart, maxEnd) || [];

	const [sliderRefMin] = useKeenSlider(
		{
			animationEnded: (s) => {
				onMinChange?.(minStartEndList[s.track.details.abs]);
				// console.log(
				// 	'[animationEnded]',
				// 	s,
				// 	s.track.details.rel,
				// 	s.track.details.abs
				// );
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
				onMaxChange?.(maxStartEndList[s.track.details.abs]);
				// console.log(
				// 	'[animationEnded]',
				// 	s,
				// 	s.track.details.rel,
				// 	s.track.details.abs
				// );
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

	return (
		<div className={`relative h-full w-full bg-black ${className}`}>
			<div className="absolute top-16 h-8 w-full border-y border-white"></div>
			<div className="flex h-full w-full justify-center space-x-4">
				<div
					key="min-slider"
					className={'keen-slider h-full !w-8'}
					ref={sliderRefMin}
				>
					{minStartEndList.map((count) => (
						<div
							key={count}
							className="keen-slider__slide text-center text-secondary"
						>
							{count}
						</div>
					))}
				</div>

				<div
					key="max-slider"
					className={'keen-slider h-full !w-8'}
					ref={sliderRefMax}
				>
					{maxStartEndList.map((count) => (
						<div
							key={count}
							className="keen-slider__slide text-center text-secondary"
						>
							{count}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}; // End of MinMaxPicker

export default MinMaxPicker;
