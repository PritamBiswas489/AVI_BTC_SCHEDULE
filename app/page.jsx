'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../components/booking/booking.module.css';

export default function HomePage() {
  const router = useRouter();
  const [ticketNumber, setTicketNumber] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const ticket = ticketNumber.trim();
    if (!ticket) return;
    router.push(`/call/${encodeURIComponent(ticket)}`);
  }

  return (
    <main className={styles.page}>
      <section className={styles.phoneShell}>
        <header className={styles.hero}>
          <img className={styles.logo} src="/images/lametayel-logo.png" alt="המרכז למטייל תאילנד" />
          <h1>תיאום שיחה</h1>
          <p>הזינו את מספר הכרטיס כדי להמשיך לבחירת מועד לשיחה.</p>
        </header>

        <div className={styles.content}>
          <section className={`${styles.card} ${styles.entryCard}`}>
            <h2 className={styles.entryTitle}>מספר כרטיס</h2>
            <form className={styles.ticketForm} onSubmit={handleSubmit}>
              <label className={styles.ticketLabel} htmlFor="ticket-number">מספר הכרטיס שלכם</label>
              <input
                autoComplete="off"
                className={styles.ticketInput}
                id="ticket-number"
                name="ticketNumber"
                onChange={event => setTicketNumber(event.target.value)}
                required
                type="text"
                value={ticketNumber}
              />
              <button className={styles.primaryButton} type="submit">המשך לתיאום שיחה</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}