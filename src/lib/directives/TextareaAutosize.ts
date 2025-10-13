export function TextareaAutosize(node: HTMLElement) {
	node.style.height = 'auto';
	node.style.height = node.scrollHeight + 'px';
	return {};
}
