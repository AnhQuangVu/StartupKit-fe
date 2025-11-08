// Backend API Base URL - đọc từ .env file
const API_BASE = import.meta.env.VITE_API_BASE || '/api';
export { API_BASE };
export const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

// Simple fetch with timeout helper to avoid hanging requests
export async function fetchWithTimeout(resource, options = {}) {
	const { timeout = 10000, signal: extSignal, ...rest } = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	// If external signal is provided, abort this controller when external aborts
	if (extSignal) {
		if (extSignal.aborted) controller.abort();
		else extSignal.addEventListener('abort', () => controller.abort());
	}

	try {
		const response = await fetch(resource, { ...rest, signal: controller.signal });
		return response;
	} finally {
		clearTimeout(timeoutId);
	}
}

export default { API_BASE, authHeaders, fetchWithTimeout };
