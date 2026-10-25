'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';

import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const hasHydrated = useCurrencyStore(state => state.hasHydrated);
  const baseCurrency = useCurrencyStore(state => state.baseCurrency);
  const setBaseCurrency = useCurrencyStore(state => state.setBaseCurrency)
  useEffect(() => {
    if(!hasHydrated || baseCurrency) return;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);
      setBaseCurrency(data.results[0].annotations.currency.iso_code);
      return data.results[0].annotations.currency.iso_code;
    };

    const error = () => {
      setBaseCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [hasHydrated, baseCurrency, setBaseCurrency]);

  return null;
}
