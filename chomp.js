import { parse } from "https://deno.land/std@0.96.0/flags/mod.ts";
import { readJSON } from "https://cdn.jsdelivr.net/gh/slymax/chomp/utils.js";
import runSubcommand from "https://deno.land/x/deploy@0.3.0/src/subcommands/run.ts";

const config = await readJSON("config.json") || {};
const args = parse(Deno.args, {
    boolean: ["watch"], string: ["port"], default: {
        watch: !(config.watch === false),
        port: config.port || 8000
    }
});

args._.length && runSubcommand({
    addr: "127.0.0.1:" + args.port,
    libs: "ns,window,fetchevent",
    watch: args.watch,
    _: args._
});
