export function ClickOutside(node: HTMLElement, ignore?: string) {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement;
		if (!event.target || (ignore && target.closest(ignore))) {
			return;
		}
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Esc') {
			if (node && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('clickOutside'));
			}
		}
	};

	document.addEventListener('click', handleClick, true);
	document.addEventListener('keydown', handleKeydown, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('keydown', handleKeydown, true);
		}
	};
}
