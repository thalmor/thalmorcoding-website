exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let recetas = [];
  try {
    const body = JSON.parse(event.body || "{}");
    if (Array.isArray(body.recetas)) {
      recetas = body.recetas.map((r) => String(r)).slice(0, 200);
    }
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Body inválido" }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Falta configurar OPENAI_API_KEY en Netlify." }) };
  }

  const listaNombres = recetas.length ? recetas.join(", ") : "(todavía no hay comidas cargadas)";

  const prompt = `Sos un cocinero casero argentino. Esta es la lista de comidas que ya se cocinan en esta casa: ${listaNombres}.
Inventá UNA receta casera nueva, distinta a todas las de la lista, pero que use ingredientes y técnicas de cocción parecidas a las que ya aparecen (horno, plancha/parrilla, frito, hervido/guisado, relleno al horno).
Respondé ÚNICAMENTE con un JSON válido (sin bloques de código, sin texto extra) con esta forma exacta:
{"nombre": "string", "categoria": "carne" | "pollo" | "cerdo" | "relleno", "coccion": "Horno" | "Plancha/Parrilla" | "Frito" | "Hervido/Guisado" | "Relleno al horno", "ingredientes": "string breve", "preparacion": "string breve, maximo 3 pasos"}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return { statusCode: 502, body: JSON.stringify({ error: "Error consultando la IA", detail: errText }) };
    }

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content || "";

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ texto }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno", detail: String(err) }) };
  }
};
