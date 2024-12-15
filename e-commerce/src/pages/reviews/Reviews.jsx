import "./styles/reviews.css";
import img from "../../components/header/avatarBackground.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Emma Thompson",
    title: "CTO, Innovate Solutions",
    image: "assets/images/emma-thompson.jpg",
    quote:
      "This product has revolutionized our workflow. Absolutely phenomenal!",
  },
  {
    name: "Michael Chen",
    title: "Founder, GreenTech Startup",
    image: "assets/images/michael-chen.jpg",
    quote:
      "Incredible efficiency gains. Our team's productivity has skyrocketed.",
  },
  {
    name: "Sophia Rodriguez",
    title: "Head of Design, Creative Co.",
    image: "assets/images/sophia-rodriguez.jpg",
    quote: "User-friendly and powerful. It's transformed our design process.",
  },
  {
    name: "Alexander Kim",
    title: "CFO, Global Enterprises",
    image: "assets/images/alexander-kim.jpg",
    quote: "The ROI is outstanding. Best investment we've made this year.",
  },
  {
    name: "Olivia Patel",
    title: "Director of Operations, Swift Logistics",
    image: "assets/images/olivia-patel.jpg",
    quote: "Streamlined our operations beyond expectations. Highly recommend!",
  },
  {
    name: "Lucas Müller",
    title: "Lead Developer, TechForge",
    image: "assets/images/lucas-muller.jpg",
    quote:
      "Robust features and excellent support. A game-changer for developers.",
  },
];

const Reviews = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="landing-page"
    >
      <motion.header className="hero-section">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("Welcome to Our Company")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("We offer the best solutions for your next project")}
        </motion.p>
        <Link to="/aboutme">
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("Contact Us")}
          </motion.button>
        </Link>
      </motion.header>

      <section className="testimonials-section">
        <h2>{t("What Our Customers Say")}</h2>
        <div className="testimonials-container">
          {testimonials.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="testimonial-card"
              key={index}
            >
              <p className="quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="client-info">
                <img
                  src={img}
                  alt={item.name}
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Reviews;
