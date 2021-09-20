import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface IindexProps {
	data: {
		title: string;
		url: string;
	};
	// paths: string;
}

const index: React.FunctionComponent<IindexProps> = ({ data }) => {
	const { title, url } = data;
	return (
		<div>
			<h2>Image {title}</h2>

			<Image src={url} width={500} height={500} alt={title} />
			<Link href="/">
				<a>Home</a>
			</Link>
		</div>
	);
};

interface Iparams extends ParsedUrlQuery {
	data: string;
}
interface Data {
	id: number;
}
// 공식문서 따라서 만들었지만, 오류 나는 이유 도저히 못찾겠음
// 일단은 실행 되니까, 추후 방법 찾으면 수정하겠음
export const getStaticProps: GetStaticProps = async (context) => {
	try {
		const { id } = context.params as Iparams;
		// https://jsonplaceholder.typicode.com/photos/1
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/photos/${id}`
		);
		const data: Data = response.data;
		return {
			props: {
				data,
			},
			revalidate: 20,
		};
	} catch (error) {
		console.log(error);
	}
};
export const getStaticPaths: GetStaticPaths = async () => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
	);
	const data = response.data;
	const ids = data.map((item: { id: number }) => item.id);
	const paths = ids.map((id: number) => {
		return {
			params: { id: id.toString() },
		};
	});
	return {
		paths: paths,
		// paths: [
		// 	//항상 정해진 paths만 쓸수는 없으므로 동적으로 변환
		// 	{
		// 		params: { id: '1' },
		// 	},
		// 	{
		// 		params: { id: '2' },
		// 	},
		// 	{
		// 		params: { id: '3' },
		// 	},
		// ],
		fallback: false, // blocking 할 경우 제한 없이 정해진 페이지만 나오지 않게됨
	};
};

export default index;
