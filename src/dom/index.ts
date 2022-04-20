export function cx(...classes: any[]): string {
	return classes.filter(Boolean).join(' ');
}
