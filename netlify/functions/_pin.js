function checkPin(event) {
  const expected = process.env.RECETARIO_PIN;
  if (!expected) {
    return { ok: false, response: { statusCode: 500, body: JSON.stringify({ error: "Falta configurar RECETARIO_PIN en Netlify." }) } };
  }
  const given = event.headers["x-recetario-pin"] || event.headers["X-Recetario-Pin"];
  if (given !== expected) {
    return { ok: false, response: { statusCode: 401, body: JSON.stringify({ error: "PIN incorrecto" }) } };
  }
  return { ok: true };
}

module.exports = { checkPin };
