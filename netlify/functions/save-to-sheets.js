// Netlify Function: 주문 폼 제출 데이터를 Google Sheets에 저장 (성공운 랜딩)
// Netlify 환경 변수: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
const { google } = require('googleapis');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const {
      GOOGLE_SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
    } = process.env;

    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Server configuration error',
          details: 'Missing environment variables (GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY)',
        }),
      };
    }

    const {
      naver_id,
      customer_name,
      phone_number,
      org_name,
      address,
      order_summary,
      mount_type,
      elevator,
      payment,
    } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
    const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || 'Sheet1';
    const range = `'${firstSheetTitle}'!A:K`;

    const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    const rowValues = [
      timestamp,
      naver_id || '',
      customer_name || '',
      phone_number || '',
      org_name || '',
      address || '',
      order_summary || '',
      mount_type || '',
      elevator || '',
      payment || '',
      '성공운',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [rowValues] },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: '데이터가 Google Sheets에 저장되었습니다.' }),
    };
  } catch (error) {
    console.error('[save-to-sheets]', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to save to Google Sheets', details: error.message }),
    };
  }
};
