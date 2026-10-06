import styles from './booking.module.css';

export default function TimeStep({ dateLabel, slots, selectedTime, onSelectTime, onBack, onContinue }) {
  const available = slots.filter(slot => slot.available !== false);
  return (
    <section className={styles.card}>
      <div className={styles.selectionSummary}>
        <span className={styles.summaryIcon}>📅</span>
        <div><small>התאריך שנבחר:</small><strong>{dateLabel}</strong></div>
      </div>

      <h2 className={styles.sectionTitle}>בחרו שעה לשיחה</h2>
      {available.length ? (
        <div className={styles.slotGrid}>
          {available.map(slot => (
            <button
              type="button"
              key={slot.time}
              className={`${styles.slotButton} ${selectedTime === slot.time ? styles.slotSelected : ''}`}
              onClick={() => onSelectTime(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>
      ) : <div className={styles.emptyState}>אין שעות זמינות בתאריך הזה.</div>}

      <button type="button" className={styles.softAction} onClick={onBack}>לא מצאתם שעה מתאימה? בחרו תאריך אחר</button>
      <button className={styles.primaryButton} type="button" disabled={!selectedTime} onClick={onContinue}>המשך לאישור</button>
    </section>
  );
}
