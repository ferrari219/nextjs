import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
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

//js 상태로는 잘 실행되지만, 현재로선 도저히 모르겠음
type ParsedUrlQuery = {
	params: string;
};
type Data = {
	id: number;
};
export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext<ParsedUrlQuery>
) => {
	try {
		const { id } = context.params;
		// https://jsonplaceholder.typicode.com/photos/1
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/photos/${id}`
		);
		const data: Data[] = response.data;
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
	const photo = response.data;
	// console.log(photo);
	const ids = photo.map((item: Array<{ id: number }>) => item.id);
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
