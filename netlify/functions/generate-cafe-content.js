const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const extractJson = (text) => {
  const cleaned = String(text || '').replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response does not contain JSON');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
};

const getGeminiText = (data) => {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || '').join('\n').trim();
};

const makePostPrompt = (inputs) => {
  const {
    weekLabel = '',
    topic = '',
    audience = '',
    highlights = '',
    installs = '',
    cta = '',
  } = inputs || {};

  return [
    '당신은 한국어 카페 홍보 글 작성 도우미입니다.',
    '목표: 네이버 카페 업로드용 주간 홍보글 초안을 만듭니다.',
    '출력은 반드시 JSON 한 개만 반환하세요.',
    '키는 title, body 만 사용하세요.',
    'body는 자연스러운 한국어 문장으로 작성하고 줄바꿈을 포함하세요.',
    '과장/허위 문구 없이 실무형 톤으로 작성하세요.',
    '',
    '[입력]',
    `기준일: ${weekLabel}`,
    `주제: ${topic}`,
    `타깃: ${audience}`,
    `핵심포인트: ${highlights}`,
    `설치사례: ${installs}`,
    `CTA: ${cta}`,
    '',
    '반드시 아래 형태로만 응답:',
    '{"title":"...","body":"..."}',
  ].join('\n');
};

const makeReplyPrompt = (inputs) => {
  const { question = '', stance = '기본', contact = '' } = inputs || {};

  return [
    '당신은 한국어 고객 문의 댓글 답변 작성 도우미입니다.',
    '출력은 반드시 JSON 한 개만 반환하세요.',
    '키는 reply 하나만 사용하세요.',
    `톤: ${stance}`,
    `문의내용: ${question}`,
    `마무리 연락문구: ${contact}`,
    '',
    '조건:',
    '- 3~4문장으로 간결하게 작성',
    '- 공손한 톤 유지',
    '- 설치 환경에 따라 달라질 수 있다는 안내 포함',
    '',
    '반드시 아래 형태로만 응답:',
    '{"reply":"..."}',
  ].join('\n');
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { GEMINI_API_KEY, GEMINI_MODEL } = process.env;
    if (!GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Missing GEMINI_API_KEY',
        }),
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { mode, inputs } = body;
    const model = GEMINI_MODEL || 'gemini-1.5-flash';

    if (!mode || !['post', 'reply'].includes(mode)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid mode' }),
      };
    }

    const prompt = mode === 'post' ? makePostPrompt(inputs) : makeReplyPrompt(inputs);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'Gemini request failed', details: errorText }),
      };
    }

    const geminiData = await geminiRes.json();
    const rawText = getGeminiText(geminiData);
    const parsed = extractJson(rawText);

    if (mode === 'post') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          title: parsed.title || '',
          body: parsed.body || '',
          model,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: parsed.reply || '',
        model,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate content',
        details: error.message,
      }),
    };
  }
};
