// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ExchangeInfo, Rate } from '../service/exchangeAPI';

type CurrencyState = {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  hasHydrated: boolean;
  rates: Rate[];
  setHasHydrated: (state: boolean) => void;
  exchangeInfo: ExchangeInfo | null;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setRates: (rates: Rate[]) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasHydrated: false,
      exchangeInfo: null,
      rates: [],
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setExchangeInfo: (info) => set({ exchangeInfo: info }),
      setRates: (rates) => set({ rates }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
