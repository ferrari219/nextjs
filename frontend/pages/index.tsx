import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styled from 'styled-components';

const Ul = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
	list-style: none;
	padding: 0;
	img {
		width: 100%;
	}
	span {
		display: flex;
		font-size: 1.2rem;
	}
`;
interface IhomeProps {
	data: Array<{
		id: number;
		title: string;
		url: string;
		thumbnailUrl: string;
	}>;
}

const Home: NextPage<IhomeProps> = ({ data }) => {
	// console.log(data);
	return (
		<div>
			<h1>index</h1>
			<Ul>
				{data &&
					data.map((item) => (
						<li key={item.id}>
							<Link href={`/photos/${item.id}`}>
								<a>
									<Image
										src={item.thumbnailUrl}
										width={500}
										height={500}
										// layout="fill"
										alt={item.title}
									/>
									<span>{item.title}</span>
								</a>
							</Link>
						</li>
					))}
			</Ul>
		</div>
	);
};

export default Home;

export const getStaticProps = async () => {
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/photos?_start=0&_end=10'
		);
		const data = response.data;
		return {
			props: {
				data: data,
			},
			revalidate: 20, //20초마다 새로 바뀐 내용 받아옴
		};
	} catch (error) {
		console.log(error);
	}
};

// export const getServerSideProps = async () => {
// 	try {
// 		const response = await axios.get('http://localhost:8080/api/posts');
// 		const data = response.data;
// 		return {
// 			props: {
// 				data: data,
// 			},
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
