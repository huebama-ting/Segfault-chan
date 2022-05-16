import axios from 'axios';
import https from 'https';

class HttpService {
  private http;

  constructor() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    this.http = axios.create({ httpsAgent });
  }

  async get<T>(uri: string): Promise<T> {
    const response = await this.http.get<T>(uri);

    return response.data;
  }
}

export const httpService = new HttpService();
