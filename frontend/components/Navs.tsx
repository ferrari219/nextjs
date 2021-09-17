import React from 'react';
import Link from 'next/link';

const Navs = () => {
	return (
		<nav>
			<h2>Navigation</h2>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a>About</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navs;
