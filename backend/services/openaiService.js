const OpenAI = require('openai');

let client = null;

function getClient() {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY .env faylida aniqlanmagan');
  }
  client = new OpenAI({ apiKey });
  return client;
}

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function chatJSON({ system, user, model = DEFAULT_MODEL, temperature = 0.2 }) {
  const openai = getClient();

  const completion = await openai.chat.completions.create({
    model,
    temperature,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content || '{}';
  try {
    return JSON.parse(raw);
  } catch (err) {
    const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim();
    return JSON.parse(cleaned);
  }
}

module.exports = { getClient, chatJSON, DEFAULT_MODEL };
