const { getStore } = require("@netlify/blobs");
const { checkPin } = require("./_pin");

exports.handler = async (event) => {
  const pinCheck = checkPin(event);
  if (!pinCheck.ok) return pinCheck.response;

  const store = getStore("recetario");

  if (event.httpMethod === "GET") {
    const data = await store.get("recipes", { type: "json" });
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ recetas: data || null }),
    };
  }

  if (event.httpMethod === "POST") {
    let recetas;
    try {
      const body = JSON.parse(event.body || "{}");
      recetas = body.recetas;
      if (!Array.isArray(recetas)) throw new Error("recetas debe ser un array");
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "Body inválido" }) };
    }
    await store.setJSON("recipes", recetas);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
