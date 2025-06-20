import './Calendar.css';

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const daysOfWeek: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const getDatesToShow = (): Date[] => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = getDatesToShow();
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {dates.map((date, index) => (
          <div key={index} className={`day-cell ${index === 0 ? 'today' : ''}`}>
            <div className="day-name">{daysOfWeek[date.getDay()]}</div>
            <div className="day-number">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
