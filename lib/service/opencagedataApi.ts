import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Result {
  annotations: {
    currency: {
      iso_code: string;
    };
  };
}

interface ResponseArr {
  results: Result[];
}

export const getUserInfo = async ({ latitude, longitude }: Coordinates): Promise<ResponseArr> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<ResponseArr>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
