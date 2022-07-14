import { serve } from "https://deno.land/std@0.142.0/http/server.ts";

serve(async request => {
    try {
        let url = "https://raw.githubusercontent.com";
        const path = new URL(request.url).pathname.split("/");
        if (path.length === 2) url += "/slymax/chomp/master";
        const response = await fetch(url + path.join("/"));
        if (response.status !== 200) throw("NOT FOUND");
        return new Response(await response.text());
    } catch (error) {
        return new Response(error, { status: 404 });
    }
});
