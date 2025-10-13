import numeral from 'numeral';

export const formatAddress = (address: string, charNbr: number = 4): string => {
	if (!address) return address;
	return address.slice(0, charNbr) + '...' + address.slice(-charNbr);
};

export const formatNumber = (nbr: number | string, decimals = 1) => {
	const formatted = numeral(nbr)
		.format(`0.${Array(decimals).fill('0').join('')} a`)
		.toUpperCase();
	if (Number(nbr) < 1 || formatted.toLowerCase().trim() === 'nan') {
		const formatter = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 18,
			useGrouping: false
		});
		const intlNbr = formatter.format(Number(nbr));
		if (intlNbr.toLowerCase().trim() === 'nan') {
			return nbr;
		} else {
			return intlNbr;
		}
	} else {
		return formatted;
	}
};

export const firstLetterUpperCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
