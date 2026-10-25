'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';

export default function ExchangeForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get('currency') as string;
    if (inputValue.trim() === '') {
      return;
    }
    const [amount, from, , to] = inputValue.split(' ');
    const data = await exchangeCurrency({ amount: Number(amount), from, to });
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
