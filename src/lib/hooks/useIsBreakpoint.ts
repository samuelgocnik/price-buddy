import { BREAKPOINTS } from '../theme';

import { useMediaQuery } from './useMediaQuery';

/**
 * Custom hook to determine if the viewport is in a mobile view.
 *
 * @param {keyof typeof BREAKPOINTS} [breakpoint] - breakpoint key from the BREAKPOINTS object.
 * @returns {boolean} - A boolean indicating whether the viewport is currently in a mobile view.
 */
export const useIsBreakpoint = (
	breakpoint: keyof typeof BREAKPOINTS
): boolean => {
	const match = BREAKPOINTS[breakpoint];
	return useMediaQuery(`(max-width: ${match - 1}px)`);
};
