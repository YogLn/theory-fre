const devBaseURL = "http://121.4.100.103:5000";
const proBaseURL = "http://121.4.100.103:5000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
