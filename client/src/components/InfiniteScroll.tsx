import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * InfiniteScroll 컴포넌트
 *
 * @param {Function} dataFetcher - 새로운 데이터를 가져오는 함수
 * @param {Function} renderItem - 각 데이터 항목을 렌더링하는 함수
 * @param {number} threshold - IntersectionObserver의 교차 임계값
 */
function InfiniteScroll({ dataFetcher, renderItem, threshold = 0.5 }) {
	// 데이터를 저장하는 상태
	const [items, setItems] = useState([]);
	// 로딩 상태
	const [loading, setLoading] = useState(false);
	// 마지막 항목을 참조하기 위한 ref
	const lastItemRef = useRef(null);

	const loadMore = useCallback(async () => {
		setLoading(true);
		const newItems = await dataFetcher();
		setItems((prevItems) => [...prevItems, ...newItems]);
		setLoading(false);
	}, [dataFetcher]);

	useEffect(() => {
		// IntersectionObserver의 콜백 함수
		const handleIntersection = (entries) => {
			const entry = entries[0];
			// 마지막 항목이 뷰포트와 교차하면 새 데이터 로드
			if (entry.isIntersecting) {
				loadMore();
			}
		};

		const options = {
			root: null, // 뷰포트를 기준으로 함
			rootMargin: '0px', // 마진은 없음
			threshold, // 교차의 임계값 설정
		};

		const observer = new IntersectionObserver(handleIntersection, options);

		if (lastItemRef.current) {
			observer.observe(lastItemRef.current); // 마지막 항목을 감시
		}

		return () => {
			// 컴포넌트 정리 시 observer 연결 해제
			if (lastItemRef.current) {
				observer.unobserve(lastItemRef.current);
			}
		};
	}, [loadMore, threshold]);

	return (
		<div>
			{/* 아이템들 렌더링 */}
			{items.map((item, index) => {
				if (index === items.length - 1) {
					// 마지막 항목에는 ref를 연결
					return (
						<div key={index} ref={lastItemRef}>
							{renderItem(item)}
						</div>
					);
				}
				return <div key={index}>{renderItem(item)}</div>;
			})}
			{loading && <div>Loading...</div>}
		</div>
	);
}

export default InfiniteScroll;
