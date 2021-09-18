import type { NextPage } from 'next';
import axios from 'axios';
interface IhomeProps {
	data: Array<{
		userId: number;
		id: number;
		title: string;
	}>;
}

const Home: NextPage<IhomeProps> = ({ data }) => {
	console.log(data);
	return (
		<div>
			<h1>index</h1>
			<ul>
				{data &&
					data.map((item) => <li key={item.id}>{item.title}</li>)}
			</ul>
		</div>
	);
};

export default Home;

export const getStaticProps = async () => {
	try {
		const response = await axios.get('http://localhost:8080/api/posts');
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
