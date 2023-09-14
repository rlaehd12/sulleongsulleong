// import React, { useEffect, useRef, useCallback } from 'react';

// function InfiniteScroll({ data, fetchData, isLoading }) {
// 	const observer = useRef();

// 	const lastDataElementRef = useCallback(
// 		(node) => {
// 			if (isLoading) return;
// 			if (observer.current) observer.current.disconnect();
// 			observer.current = new IntersectionObserver((entries) => {
// 				if (entries[0].isIntersecting) {
// 					fetchData();
// 				}
// 			});
// 			if (node) observer.current.observe(node);
// 		},
// 		[isLoading, fetchData],
// 	);

// 	return (
// 		<div>
// 			{data.map((item, index) => {
// 				if (data.length === index + 1) {
// 					return (
// 						<div ref={lastDataElementRef} key={item.id}>
// 							{item.value}
// 						</div>
// 					);
// 				}
// 				return <div key={item.id}>{item.value}</div>;
// 			})}
// 			{isLoading && 'Loading...'}
// 		</div>
// 	);
// }

// export default InfiniteScroll;

function InfiniteScroll() {
	return null;
}

export default InfiniteScroll;
