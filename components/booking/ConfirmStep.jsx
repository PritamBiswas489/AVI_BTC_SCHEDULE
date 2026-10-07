import styles from './booking.module.css';
import { formatTime } from './formatTime.js';

export default function ConfirmStep({ dateLabel, time, duration, timezoneLabel, onBack, onConfirm, loading }) {
  return (
    <section className={styles.card}>
      <div className={styles.confirmIcon}>✓</div>
      <h2 className={styles.confirmTitle}>פרטי השיחה נבחרו בהצלחה</h2>

      <div className={styles.detailsCard}>
        <Detail icon="📅" label="תאריך" value={dateLabel} />
        <Detail icon="◷" label="שעה" value={formatTime(time)} />
      </div>

      <div className={styles.infoBox}>ⓘ <span>לאחר האישור, ניצור את השיחה במועד שבחרתם.</span></div>
      <button type="button" className={styles.softAction} onClick={onBack}>✎ לשינוי התאריך או השעה</button>
      <button className={styles.primaryButton} type="button" onClick={onConfirm} disabled={loading}>
        {loading ? 'קובע את השיחה...' : 'אישור השיחה'}
      </button>
    </section>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailIcon}>{icon}</span>
      <span className={styles.detailLabel}>{label}:</span>
      <strong className={styles.detailValue}>{value}</strong>
    </div>
  );
}
