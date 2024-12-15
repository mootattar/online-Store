import { Link } from "react-router-dom";
import "./styles/footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={"footer"}>
      <div className={"container"}>
        {/* Section 1: Store Info */}
        <div className={"storeInfo"}>
          <h2 className={"logo"}>{t("ATTAR STORE")}</h2>
          <p>{t("Best store for your favorite products.")}</p>
        </div>

        {/* Section 2: Navigation Links */}
        <div className={"navLinks"}>
          <h3>{t("Important Links")}</h3>
          <ul>
            <li>
              <Link to="/aboutme">{t("About Us")}</Link>
            </li>
            <li>
              <Link to="/privacy">{t("Privacy Policy")}</Link>
            </li>
            <li>
              <Link to="/faq">{t("FAQs")}</Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div className={"socialMedia"}>
          <h3>{t("Follow Us")}</h3>
          <ul>
            <li>
              <Link to="https://github.com/mootattar" target="_blank">
                Github
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/abdulrahman-al-attar-40a7b22b0/">
                Linkedin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 4: Copyright */}
      <div className={"copyright"}>
        <p>
          &copy; {new Date().getFullYear()} {t("ATTAR STORE")}.
          {t("All rights reserved.")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
