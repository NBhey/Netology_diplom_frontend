import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import "./Main.css";

const Main = () => {
  return (
    <main className="main">
      <div className="main-container">
        <Header />
        <Calendar />
      </div>
    </main>
  );
};

export default Main;
