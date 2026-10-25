import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

interface CredentialsProps {
  to: string;
  from: string;
  amount: number;
}

interface ExchangeInfo {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
}

interface Response {
 query: ExchangeInfo,
 info: {rate: number},
 result: number
}

export const exchangeCurrency = async (credentials: CredentialsProps): Promise<ExchangeInfo> => {
  const {
    data: { query, info, result },
  } = await instance.get<Response>('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency) => {
  const { data } = await instance.get(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates);
};
