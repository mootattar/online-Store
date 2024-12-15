import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Logo() {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <button className="marketName">
        <span data-foo={t("ATTAR")} className="actual-text">
          {t("ATTAR")}
        </span>
      </button>
    </Link>
  );
}

export default Logo;
