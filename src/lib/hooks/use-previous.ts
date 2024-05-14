import { useEffect, useRef } from 'react';

/**
 * `usePrevious` is a hook that returns the previous value of a given variable.
 *
 * @template T The type of the variable.
 * @param {T} value - The variable whose previous value is to be returned.
 *
 * @returns {T | undefined} The previous value of the given variable. If the hook is called for the first time, it returns `undefined`.
 *
 * @example
 * // To use this hook, import it and pass the variable as an argument:
 * const previousValue = usePrevious(currentValue);
 */
export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};
