const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
  dots: document.querySelectorAll('.box-dots'),
};
dotsBlinker();

class Timer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  getTimeComponents(time) {
    const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
      refs.days.textContent = `${days}`;
      refs.hours.textContent = `${hours}`;
      refs.mins.textContent = `${mins}`;
      refs.secs.textContent = `${secs}`;
    }, 1000);
  }
}
const countdownTimer = new Timer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

countdownTimer.start();

function dotsBlinker() {
  setInterval(() => {
    refs.dots.forEach(el => (el.style.opacity = 0));
  }, 700);
  setInterval(() => {
    refs.dots.forEach(el => (el.style.opacity = 1));
  }, 1400);
}
