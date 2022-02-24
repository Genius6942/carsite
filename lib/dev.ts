/**
 * @function sleep - wait for certain ms before resolving (wait in async function. can be used to simulate data fetching wait time
 * @param {number} ms - ms to wait
 */
export default async function sleep(ms: number | true = 1000): Promise<void> {
	await new Promise(r => setTimeout(r, ms === true ? 2147483647 : ms));
}