import "./styles/hero.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export default function Hero() {
  const { t } = useTranslation();
  return (
    <>
      <main className="main">
        <section className="section banner banner-section">
          <div className="container banner-column">
            <motion.img
              initial={{ opacity: 0, y: 50, x: 300 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8 }}
              className="banner-image"
              src="https://i.ibb.co/vB5LTFG/Headphone.png"
              alt="banner"
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="banner-inner"
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="heading-xl"
              >
                {t("High-Quality Products for Everyone")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="paragraph"
              >
                {t(
                  "Explore a wide range of products designed to meet all your needs. Our store stands out for its professionalism and premium quality, ensuring you a unique shopping experience."
                )}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link to="/home">
                  <button className="btn btn-darken btn-inline">
                    {t("Discover Our Products")}
                    <i className="bx bx-right-arrow-alt"></i>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
