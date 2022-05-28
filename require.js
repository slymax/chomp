export default async path => {
	try {
		return JSON.parse(await Deno.readTextFile(path));
	} catch {
		return null;
	}
};
