const upload = "https://upload.put.io/v2/files/upload?oauth_token=";
if (!localStorage.token) localStorage.token = prompt("Token:");
const url = Deno.args[0] === "merge" ? null : prompt("URL:");
const files = [], filename = prompt("Name:") + ".mp3";
for await (const { name } of Deno.readDir(".")) {
    if (name.endsWith(".mp3")) files.push(name);
}
const cmds = {
    "merge": ["ffmpeg", "-v", "quiet", "-i", `concat:${files.sort().join("|")}`, "-acodec", "copy", filename],
    "youtube": ["yt-dlp", "-q", "-f", "ba", "-x", "--audio-format", "mp3", "-o", filename, url],
    "twitter": ["ffmpeg", "-v", "quiet", "-i", url, "-acodec", "libmp3lame", filename]
};
const process = Deno.run({ cmd: cmds[Deno.args[0]] });
console.log(url ? "Downloading..." : "Merging...");
await process.status();
const file = new File([await Deno.readFile(filename)], filename.replace(".mp3", ""));
const data = new FormData();
data.append("file", file);
console.log("Uploading...");
await fetch(upload + localStorage.token, { method: "POST", body: data });
await Deno.remove(filename);
