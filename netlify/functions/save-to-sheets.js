// Netlify Function: 상담 폼 제출 데이터를 Google Sheets에 저장
// Netlify 환경 변수: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
// 선택: GOOGLE_SHEET_ID (미설정 시 기본 시트 ID 사용)
const { google } = require('googleapis');
const DEFAULT_SHEET_ID = '1q-zYe2ouTsx--at6dzwgQFlo6jOUE5Uuq5XypDe2ASo';

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
    const body = event.body ? JSON.parse(event.body) : {};
    const {
      GOOGLE_SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
    } = process.env;
    const spreadsheetId = GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Server configuration error',
          details: 'Missing environment variables (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY)',
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
      call_time,
      call_time_slots,
      qty_65,
      qty_75,
      qty_86,
      quantity,
      additional_inquiry,
    } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || 'Sheet1';
    const range = `'${firstSheetTitle}'!A:Q`;

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
      call_time || call_time_slots || '',
      qty_65 || '0',
      qty_75 || '0',
      qty_86 || '0',
      quantity || '',
      additional_inquiry || '',
      '성공운 상담',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
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
