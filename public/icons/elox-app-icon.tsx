import { cn } from '@/lib/utils';

export default function EloxAppIcon({
	className,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={206}
			height={188}
			viewBox='0 0 206 188'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={cn('h-10 w-10', className)}
			{...props}>
			<path
				d='M202.76 0.78302C201.528 0.78302 82.6821 1.10117 82.6821 1.10117C33.3227 3.96449 -1.12709 51.3684 0.699975 101.954C36.6569 60.8115 56.2709 46.6752 89.9965 42.4602C89.9965 42.4602 149.644 42.8558 161.007 42.1421C172.37 41.4284 178.391 35.1429 179.915 33.5521C181.439 31.9614 205.198 4.91893 205.198 4.91893C205.198 4.91893 205.504 3.50097 205.198 2.6919C204.761 1.53609 203.992 0.78302 202.76 0.78302Z'
				fill='url(#paint0_linear_5386_4932)'
			/>
			<path
				d='M93.3616 69.8209C50.0849 69.8209 21.1321 98.1359 8.63668 138.541C12.6096 147.043 15.4917 151.137 21.1321 157.947C47.0372 126.769 60.9956 116.106 85.7425 112.771H130.238C135.115 112.771 142.734 108.953 144.867 106.726L173.515 74.2749C174.429 72.366 173.21 70.139 171.382 69.8209H93.3616Z'
				fill='url(#paint1_linear_5386_4932)'
			/>
			<path
				d='M8.63668 138.541C14.4827 120.926 19.6083 110.862 32.4084 95.9089C45.2086 125.497 66.3322 138.377 93.6664 140.131L202.773 139.813C205.516 140.131 205.82 142.995 204.906 144.585L172.601 180.854C170.163 183.717 162.848 187.217 156.753 187.217L77.209 186.899C41.2466 183.081 20.8273 163.356 8.63668 138.541Z'
				fill='url(#paint2_radial_5386_4932)'
			/>
			<path
				d='M53.3854 125.266C44.9643 118.277 37.9159 108.639 32.4084 95.9089C25.4307 104.06 20.7336 110.759 16.9572 118.019C16.4301 119.04 15.9163 120.074 15.4158 121.119C12.9562 126.295 10.848 131.878 8.63668 138.541C10.9673 143.769 13.8584 148.668 17.3138 153.178C18.4513 154.671 19.7032 156.222 21.1321 157.947C33.8709 142.616 43.7209 132.244 53.3854 125.266Z'
				fill='url(#paint3_linear_5386_4932)'
			/>
			<defs>
				<linearGradient
					id='paint0_linear_5386_4932'
					x1={180.556}
					y1={-100.055}
					x2={-75.792}
					y2={10.4496}
					gradientUnits='userSpaceOnUse'>
					<stop stopColor='#34DAF7' />
					<stop
						offset={0.670022}
						stopColor='#0E93D6'
					/>
				</linearGradient>
				<linearGradient
					id='paint1_linear_5386_4932'
					x1={44.0699}
					y1={94.3365}
					x2={216.888}
					y2={63.064}
					gradientUnits='userSpaceOnUse'>
					<stop stopColor='#50C8FF' />
					<stop
						offset={1}
						stopColor='#0193D0'
					/>
				</linearGradient>
				<radialGradient
					id='paint2_radial_5386_4932'
					cx={0}
					cy={0}
					r={1}
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(127.498 14.4245) rotate(101.548) scale(121.995 164.127)'>
					<stop stopColor='#34DBF7' />
					<stop
						offset={1}
						stopColor='#0193D0'
					/>
				</radialGradient>
				<linearGradient
					id='paint3_linear_5386_4932'
					x1={35.4562}
					y1={101.954}
					x2={17.6594}
					y2={157.518}
					gradientUnits='userSpaceOnUse'>
					<stop stopColor='#16A0E1' />
					<stop
						offset={0.926445}
						stopColor='#0293D0'
					/>
				</linearGradient>
			</defs>
		</svg>
	);
}
