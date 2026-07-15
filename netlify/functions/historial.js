const { checkPin } = require("./_pin");
const { getRecetarioStore } = require("./_store");

exports.handler = async (event) => {
  const pinCheck = checkPin(event);
  if (!pinCheck.ok) return pinCheck.response;

  const store = getRecetarioStore("recetario");

  if (event.httpMethod === "GET") {
    const data = await store.get("historial", { type: "json" });
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ historial: data || [] }),
    };
  }

  if (event.httpMethod === "POST") {
    let historial;
    try {
      const body = JSON.parse(event.body || "{}");
      historial = body.historial;
      if (!Array.isArray(historial)) throw new Error("historial debe ser un array");
    } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "Body inválido" }) };
    }
    await store.setJSON("historial", historial);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
