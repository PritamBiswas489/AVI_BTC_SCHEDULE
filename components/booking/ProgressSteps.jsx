import styles from './booking.module.css';

const steps = [
  { n: 1, label: 'תאריך' },
  { n: 2, label: 'שעה' },
  { n: 3, label: 'אישור' },
  { n: 4, label: 'סיום' },
];

export default function ProgressSteps({ step }) {
  return (
    <div className={styles.stepper} aria-label="שלבי תיאום השיחה">
      {steps.map(item => (
        <div className={styles.stepItem} key={item.n}>
          <span className={`${styles.stepCircle} ${item.n === step ? styles.stepActive : ''} ${item.n < step ? styles.stepDone : ''}`}>
            {item.n < step ? '✓' : item.n}
          </span>
          <span className={item.n === step ? styles.stepLabelActive : styles.stepLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
