export const SERVER_URL = 'http://localhost:5000';
export const MAIN_SCREEN: number = 0
export const UPLOAD_SCREEN: number = 1
export const RESULTS_SCREEN: number = 2
export const TOGGLING_FEATURES_SCREEN: number = 3
export const OK = 0;
export const SUCCESS = 0;

export const FORM_VALIDATION_ERROR = 1000;
export const INDEX_FILE_ERROR = 1001;
export const QUERY_ERROR = 1002;
export const STOPWORDS_ERROR = 1003;
export const LEMMATIZATION_ERROR = 1004;
export const LOGIN_ERROR = 1005;

export const SEPARATORS  = Object();
SEPARATORS["line"] = ".\n";
SEPARATORS["paragraph"] = "\n\n";

export const CHUNK_SIZE = 0;
export const CHUNK_OVERLAP= 0;

export const NLTK_ENGLISH = "english"