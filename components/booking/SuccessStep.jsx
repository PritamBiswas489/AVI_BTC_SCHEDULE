import styles from './booking.module.css';
import { formatTime } from './formatTime.js';

export default function SuccessStep({ appointment }) {
  const dateLabel = appointment?.bookingDate.split('T')?.[0].split('-').reverse().join('-');

  return (
    <section className={styles.card}>
      <div className={`${styles.confirmIcon} ${styles.successIcon}`}>✓</div>
      <h2 className={styles.successTitle}>השיחה נקבעה בהצלחה</h2>

      <div className={styles.detailsCard}>
        <div className={styles.detailRow}><span className={styles.detailIcon}>📅</span><span className={styles.detailLabel}>תאריך:</span><strong className={styles.detailValue}>{dateLabel}</strong></div>
        <div className={styles.detailRow}><span className={styles.detailIcon}>◷</span><span className={styles.detailLabel}>שעה:</span><strong className={styles.detailValue}>{formatTime(appointment?.bookingTime)}</strong></div>
        {/* <div className={styles.detailRow}><span className={styles.detailIcon}>☎</span><span className={styles.detailLabel}>משך השיחה:</span><strong className={styles.detailValue}>{appointment?.durationMinutes || 20} דקות</strong></div> */}
      </div>

      <div className={styles.whatsappBox}>◉ <span>נשלח אליכם אישור בוואטסאפ, ואחד מנציגינו יחזור אליכם בזמן שנבחר.</span></div>
      <button className={styles.primaryButton} type="button" onClick={() => window.location.assign(process.env.NEXT_PUBLIC_FINISH_URL || 'https://www.lametayel-thailand.com/')}>סיום</button>
    </section>
  );
}
