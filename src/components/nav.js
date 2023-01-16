import { FiChevronLeft } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function Nav(props) {
  // toggles dark mode
  function toggleDarkMode() {
    if (props.dark) {
      props.setDark(false);
      localStorage.setItem('darkMode', 'disabled');
    } else {
      props.setDark(true);
      localStorage.setItem('darkMode', 'enabled');
    }
  }

  // returns to main page
  function returnToMain() {
    props.setStarted(false);
    props.setQuizFinished(false);
  }

  return (
    <nav className="nav">
      {props.started && (
        <button
          id="return--button"
          className="nav--button"
          onClick={returnToMain}
        >
          <FiChevronLeft className="icon" />
        </button>
      )}
      <button
        id="dark--mode--button"
        className="nav--button"
        onClick={toggleDarkMode}
      >
        {props.dark ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </nav>
  );
}
