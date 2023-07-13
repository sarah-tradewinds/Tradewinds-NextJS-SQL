import Slider from 'react-slick';

const MultipleRows = () => {
	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 3,
		speed: 500,
		rows: 2,
		slidesPerRow: 2
	};
	return (
		<div>
			<h2>Multiple Rows</h2>
			<Slider {...settings}>
				<div className="mx-4 bg-error">
					<h3>1</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>2</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>3</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>4</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>5</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>6</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>7</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>8</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>9</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>10</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>11</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>12</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>13</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>14</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>15</h3>
				</div>
				<div className="mx-4 bg-error">
					<h3>16</h3>
				</div>
			</Slider>
		</div>
	);
};

export default MultipleRows;
