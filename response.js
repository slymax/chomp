const methods = {
    xml: "application/xml",
    text: "text/plain",
    html: "text/html"
};

Object.entries(methods).forEach(([method, type]) => {
    !Response[method] && (Response[method] = (body, options) => {
        return new Response(body, { ...options, ...{ headers: { "content-type": type } } });
    });
});

export default Response;
