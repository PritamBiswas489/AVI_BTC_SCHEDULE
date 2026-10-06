'use client';

import { useMemo, useState } from 'react';
import styles from './booking.module.css';

const dayNames = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

function isoDate(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function DateStep({ availableDates, selectedDate, onSelectDate, onContinue, loading }) {
  const initial = selectedDate ? new Date(`${selectedDate}T12:00:00Z`) : new Date();
  const [view, setView] = useState(new Date(Date.UTC(initial.getUTCFullYear(), initial.getUTCMonth(), 1)));
  const available = useMemo(() => new Set(availableDates), [availableDates]);

  const year = view.getUTCFullYear();
  const month = view.getUTCMonth();
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const monthLabel = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(view);

  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  while (cells.length % 7) cells.push(null);

  function moveMonth(delta) {
    setView(new Date(Date.UTC(year, month + delta, 1)));
  }

  return (
    <section className={styles.card}>
      <div className={styles.calendarHeader}>
        <button type="button" className={styles.iconButton} onClick={() => moveMonth(1)} aria-label="חודש הבא">‹</button>
        <h2>{monthLabel}</h2>
        <button type="button" className={styles.iconButton} onClick={() => moveMonth(-1)} aria-label="חודש קודם">›</button>
      </div>

      <div className={styles.weekdays}>
        {dayNames.map(name => <span key={name}>{name}</span>)}
      </div>

      <div className={styles.calendarGrid}>
        {cells.map((day, index) => {
          if (!day) return <span className={styles.emptyDay} key={`e-${index}`} />;
          const date = isoDate(year, month, day);
          const enabled = available.has(date);
          const selected = selectedDate === date;
          return (
            <button
              key={date}
              type="button"
              // disabled={!enabled}
              className={`${styles.dayButton} ${selected ? styles.daySelected : ''}`}
              onClick={() => onSelectDate(date)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className={styles.infoBox}>📅 <span>השעות הזמינות יוצגו לאחר בחירת תאריך</span></div>

      <button className={styles.primaryButton} type="button" disabled={!selectedDate || loading} onClick={onContinue}>
        {loading ? 'טוען שעות...' : 'המשך לבחירת שעה'}
      </button>
    </section>
  );
}
