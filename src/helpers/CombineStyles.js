const CombineStyles = (...styles) => {
	const stuffToReturn = [];
	styles.forEach((style) => {
		if (typeof style === 'string') {
			stuffToReturn.push(...style.split(' ').filter(a => a !== ''))
		} else if (Array.isArray(style)) {
			stuffToReturn.push(...style.filter(a => a !== ''))
		}
	})

	return stuffToReturn.join(' ');
}

export default CombineStyles;
