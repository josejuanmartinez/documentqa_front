import {FORM_VALIDATION_ERROR, INDEX_FILE_ERROR, SERVER_URL} from '../constants/const'

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

export async function ProcessDocument(
  formData: FormData,
): Promise<{ code: number, message: string, result: string}> {
  console.log('Form data', formData.keys());

  let stringFiletype: any = "application/pdf";
  let isTxt = false;
  let endpoint: string = "process_pdf"
  if (!formData.has("file")) {
    return { code: FORM_VALIDATION_ERROR, message: 'File not found in form', result: ''};
  }
  if (!formData.has("filename")) {
    return { code: FORM_VALIDATION_ERROR, message: 'Filename not found in form', result: ''};
  }
  if (!formData.has("filetype")) {
    return { code: FORM_VALIDATION_ERROR, message: 'File type not found in form', result: ''};
  } else {
    const filetype: any = formData.get("filetype");
    stringFiletype = filetype.toString();
    if (stringFiletype == "application/text" || stringFiletype == "text/plain") {
      isTxt = true;
    }
  }
  if (formData.has("extract_text")) {
    const extractText: any = formData.get("extract_text");
    if (extractText.toLowerCase() == "true") {
      isTxt = true;
    }
  }

  if(isTxt) {
    endpoint = "process_text";
  }

  try {
    const response = await fetch(`${SERVER_URL}/${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return { code: result['code'], message: result['message'], result: result['result']};
  } catch (e) {
    console.log('Error', e);
    return { code: INDEX_FILE_ERROR, message: e.message, result: ''};
  }
}
