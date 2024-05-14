// Original comes from https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useMediaQuery/useMediaQuery.ts

import { useEffect, useState } from 'react';

/**
 * Custom hook to determine if a specified media query is matched.
 *
 * @param {string} query - The media query to be tested.
 * @returns {boolean} - A boolean indicating whether the media query is currently matched.
 */
export const useMediaQuery = (query: string): boolean => {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches;
		}
		return false;
	};

	const [matches, setMatches] = useState<boolean>(getMatches(query));

	const handleChange = () => {
		setMatches(getMatches(query));
	};

	useEffect(() => {
		const matchMedia = window.matchMedia(query);

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Listen matchMedia
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener('change', handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener('change', handleChange);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return matches;
};
