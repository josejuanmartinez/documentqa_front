import { dummyResponse } from '../constants/test';
import { Block } from '../types/Block';
import { SERVER_URL } from '../constants/const'

export async function checkApiStatus() {
  try {
    const res = await fetch(`${SERVER_URL}/healthcheck`, {
      method: 'GET',
    });
    return res.status == 200

  } catch (e) {
    return false;
  }
}

export async function getDocumentInformation(
  formData: FormData,
): Promise<{ status?: 'OK'; result: Block[] }> {
  console.log('Form data', formData.keys());
  try {
    const response = await fetch(`${SERVER_URL}/sentence-highlighting`, {
      method: 'POST',
      body: formData,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('Error', e);
    return { status: 'OK', result: dummyResponse };
  }
}
