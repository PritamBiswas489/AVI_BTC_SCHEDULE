'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './booking.module.css';
import ProgressSteps from './ProgressSteps.jsx';
import DateStep from './DateStep.jsx';
import TimeStep from './TimeStep.jsx';
import ConfirmStep from './ConfirmStep.jsx';
import SuccessStep from './SuccessStep.jsx';

const STEP_DATE = 1;
const STEP_TIME = 2;
const STEP_CONFIRM = 3;
const STEP_SUCCESS = 4;

export default function BookingFlow({ token }) {
  const [step, setStep] = useState(STEP_DATE);
  const [booking, setBooking] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching available dates for token:", token);
    let active = true;
    Promise.all([
       new Promise((resolve) => resolve({ ok: true, body: {} })),
      // fetch(`/api/booking/${encodeURIComponent(token)}`).then(r => r.json().then(body => ({ ok: r.ok, body }))),
      fetch(`/api/booking/${encodeURIComponent(token)}/dates`).then(r => r.json().then(body => ({ ok: r.ok, body }))),
    ]).then(([info, dates]) => {
      console.log("=======Available Dates====", dates);
      if (!active) return;
      if (!info.ok) throw new Error(info.body?.message || 'לא ניתן לטעון את הקישור.');
      if (!dates.ok) throw new Error(dates.body?.message || 'לא ניתן לטעון תאריכים זמינים.');
      setBooking(info.body);
      setAvailableDates(dates?.body?.data || []);
      if (info.body.appointment) {
        setResult(info.body.appointment);
        setStep(STEP_SUCCESS);
      }
    }).catch(err => active && setError(err.message)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [token]);

  const selectedDateLabel = useMemo(() => {
    if (!selectedDate) return '';
    const [year, month, day] = selectedDate.split('-');
    return `${day}-${month}-${year}`;
  }, [selectedDate]);

  async function continueFromDate() {
    if (!selectedDate) return;
    setLoading(true);
    setError('');
    try {   
      const response = await fetch(`/api/booking/${encodeURIComponent(token)}/slots?date=${encodeURIComponent(selectedDate)}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body?.message || 'לא ניתן לטעון שעות זמינות.');
      setSlots(body?.data || []);
      setSelectedTime('');
      setStep(STEP_TIME);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  //confirm booking 
  async function confirmBooking() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/booking/${encodeURIComponent(token)}/book`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, slot: selectedTime, "ticket_id": token }),
      });
      const body = await response.json();
      if (!response.ok) {
        if (response.status === 409 && body?.code === 'SLOT_UNAVAILABLE') {
          setStep(STEP_TIME);
          setSelectedTime('');
          await continueFromDate();
        }
        throw new Error(body?.message || 'לא ניתן לקבוע את השיחה.');
      }
      setResult(body.data);
      setStep(STEP_SUCCESS);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !booking) {
    return <main className={styles.page}><div className={styles.loader}>טוען...</div></main>;
  }

  if (error && !booking) {
    return <main className={styles.page}><div className={styles.errorCard}>{error}</div></main>;
  }

  return (
    <main className={styles.page}>
      <section className={styles.phoneShell}>
        <header className={styles.hero}>
          <button className={styles.closeButton} type="button" aria-label="סגירה" onClick={() => window.location.assign(process.env.NEXT_PUBLIC_FINISH_URL || 'https://www.lametayel-thailand.com/')}>×</button>
          <img className={styles.logo} src="/images/lametayel-logo.png" alt="המרכז למטייל תאילנד" />
          <h1>תיאום שיחה</h1>
          <p>בחרו יום ושעה שנוחים לכם לשיחה, ולאחר מכן אשרו את המועד.</p>
        </header>

        <div className={styles.content}>
          <ProgressSteps step={step} />
          {error ? <div className={styles.inlineError}>{error}</div> : null}

          {step === STEP_DATE && (
            <DateStep
              availableDates={availableDates}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onContinue={continueFromDate}
              loading={loading}
            />
          )}

          {step === STEP_TIME && (
            <TimeStep
              dateLabel={selectedDateLabel}
              slots={slots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              onBack={() => setStep(STEP_DATE)}
              onContinue={() => setStep(STEP_CONFIRM)}
            />
          )}

          {step === STEP_CONFIRM && (
            <ConfirmStep
              dateLabel={selectedDateLabel}
              time={selectedTime}
              duration={booking?.durationMinutes || 20}
              timezoneLabel={booking?.timezoneLabel || booking?.timezone || 'Thailand'}
              onBack={() => setStep(STEP_TIME)}
              onConfirm={confirmBooking}
              loading={loading}
            />
          )}

          {step === STEP_SUCCESS && (
            <SuccessStep appointment={result}  />
          )}
        </div>
      </section>
    </main>
  );
}
