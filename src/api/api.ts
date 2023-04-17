import {
  FORM_VALIDATION_ERROR,
  INDEX_FILE_ERROR, LEMMATIZATION_ERROR, LOGIN_ERROR,
  QUERY_ERROR,
  SERVER_URL,
  STOPWORDS_ERROR,
  SUCCESS
} from '../constants/const'
import axios from "axios";

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
): Promise<{ code: number, message: string, result: any}> {

  let stringFiletype: any = "application/pdf";
  let isTxt = false;
  let endpoint: string = "process_pdf"
  if (!formData.has("file")) {
    return { code: FORM_VALIDATION_ERROR, message: '`file` not found in form', result: ''};
  }
  if (!formData.has("filename")) {
    return { code: FORM_VALIDATION_ERROR, message: 'Unable to retrieve `file` filename', result: ''};
  }
  if (!formData.has("filetype")) {
    return { code: FORM_VALIDATION_ERROR, message: 'Unable to retrieve `file` type', result: ''};
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
  isTxt = false;
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
    return { code: INDEX_FILE_ERROR, message: e.message, result: ''};
  }
}

export async function ProcessQuery(formData: FormData): Promise<{ code: number, message: string, result: any}> {
  if (!formData.has("question")) {
    return { code: FORM_VALIDATION_ERROR, message: '`question` not found in form', result: ''};
  }
  try {
    const response = await fetch(`${SERVER_URL}/query`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return { code: result['code'], message: result['message'], result: result['result']};
  } catch (e) {
    return { code: QUERY_ERROR, message: e.message, result: ''};
  }
}

export async function LemmatizeAndRemoveStopwords(formData: FormData): Promise<{ code: number, message: string, result: any}> {
  if (!formData.has("text")) {
    return { code: FORM_VALIDATION_ERROR, message: '`text` not found in form', result: ''};
  }
  if (!formData.has("lan")) {
    return { code: FORM_VALIDATION_ERROR, message: '`lan` not found in form', result: ''};
  }
  try {
    const response = await fetch(`${SERVER_URL}/lemmatize_stopwords`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return { code: result['code'], message: result['message'], result: result['result']};
  } catch (e) {
    return { code: STOPWORDS_ERROR, message: e.message, result: ''};
  }
}


export async function Lemmatize(formData: FormData): Promise<{ code: number, message: string, result: any}> {
  if (!formData.has("text")) {
    return { code: FORM_VALIDATION_ERROR, message: '`text` not found in form', result: ''};
  }
  if (!formData.has("lan")) {
    return { code: FORM_VALIDATION_ERROR, message: '`lan` not found in form', result: ''};
  }
  try {
    const response = await fetch(`${SERVER_URL}/lemmatize`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return { code: result['code'], message: result['message'], result: result['result']};

  } catch (e) {
    return { code: LEMMATIZATION_ERROR, message: e.message, result: ''};
  }
}

export async function Login(formData: FormData): Promise<{ code: number, message: string, result: any}> {
  if (!formData.has("email")) {
    return { code: FORM_VALIDATION_ERROR, message: '`email` not found in form', result: ''};
  }
  if (!formData.has("password")) {
    return { code: FORM_VALIDATION_ERROR, message: '`password` not found in form', result: ''};
  }
  try {
    const result = await axios.post(`${SERVER_URL}/login`, formData)
        .then((res) => {
          return res.data;
        });
    return { code: result['code'], message: result['message'], result: result['result']};
  } catch (e) {
    return { code: LOGIN_ERROR, message: e.message, result: ''};
  }
}