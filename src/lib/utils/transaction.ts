export const getTransactionMethod = (tx: any) => {
	return tx?.method?.indexOf('(') >= 0
		? tx?.method?.split('(').shift()
		: tx?.method?.trim() === '0x'
			? null
			: tx.method;
};