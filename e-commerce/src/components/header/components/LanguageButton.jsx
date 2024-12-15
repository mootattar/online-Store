import PropTypes from "prop-types";

function LanguageButton({ changeLanguage, language }) {
  return (
    <button onClick={changeLanguage} className="language-btn">
      {language === "en" ? "AR" : "EN"}
    </button>
  );
}

LanguageButton.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default LanguageButton;
