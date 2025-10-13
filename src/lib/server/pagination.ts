export function getPaginationParams(url: URL, limit: number = 20) {
	const pageNum = Number(url.searchParams.get('p') || '1');
	const skip = (pageNum - 1) * limit;
	return { pageNum, skip, limit };
}

export function calculateTotalPages(totalCount: number, limit: number) {
	return Math.ceil(totalCount / limit);
}
