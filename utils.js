export const createResponse = (content, type) => {
	let content_type;
	if (typeof type === "string") {
		content_type = type;
	} else if (typeof content === "object") {
		content_type = "application/json";
	} else if (typeof content === "string") {
		if (content.startsWith("<")) {
			content_type = "text/html";
		} else {
			content_type = "text/plain";
		}
	}
	if (typeof content !== "string") {
		content = JSON.stringify(content);
	}
	return new Response(content, {
		headers: {
			"content-type": content_type
		}
	});
};
export const readJSON = async path => {
	try {
		return JSON.parse(await Deno.readTextFile(path));
	} catch {
		return null;
	}
};
