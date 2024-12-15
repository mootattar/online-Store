// components
import Dialog from "./components/shared/Dialog";
import Header from "./components/header/Header";
import SignIn from "./pages/forms/SignIn";
import SignUp from "./pages/forms/SignUp";
import Home from "./pages/home/Home";
import Wishlist from "./components/Wishlist/Wishlist";
import About from "./pages/about/About";
import ProductPage from "./components/Product/Product";
import Hero from "./pages/heroSection/Hero";
import Reviews from "./pages/reviews/Reviews";
// contexts
import { DialogProvider } from "./components/shared/Context/dialogContext";
import { CommentsProvider } from "./components/Product/shared/CommentsContext";
import { PaginationProvider } from "./components/Home/context/PaginationContext";
import { ThemeProviders } from "./components/Home/context/ThemeHook";
import { ToastProvider } from "./components/shared/Context/ToastContext";

// reducer
import ReducerContextProvider from "./reducers/ReducerContext";

// styles
import "./assets/style.css";
import "./assets/keyframes.css";

import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";

import MuiThemeProvider from "./components/Home/context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import PaymentPage from "./pages/forms/Buy";

function App() {
  // languages
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") ?? "en";
  });

  const changeLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    const direction = newLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    content: {
      flex: 1,
    },
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ReducerContextProvider>
        <ThemeProviders>
          <MuiThemeProvider>
            <ToastProvider>
              <DialogProvider>
                <CommentsProvider>
                  <div style={styles.container}>
                    <Router>
                      <Dialog />
                      <Header changeLanguage={changeLanguage} />
                      <div style={styles.content}>
                        <Routes>
                          <Route path="/" element={<Hero />} />
                          <Route
                            exact
                            path="/home"
                            element={
                              <PaginationProvider>
                                <Home />
                              </PaginationProvider>
                            }
                          />
                          <Route path="/login" element={<SignIn />} />
                          <Route path="/register" element={<SignUp />} />
                          <Route path="payment" element={<PaymentPage />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/aboutme" element={<About />} />
                          <Route
                            path="/product/:id"
                            element={<ProductPage />}
                          />
                          <Route path="/reviews" element={<Reviews />} />
                        </Routes>
                      </div>
                      <Footer />
                    </Router>
                  </div>
                </CommentsProvider>
              </DialogProvider>
            </ToastProvider>
          </MuiThemeProvider>
        </ThemeProviders>
      </ReducerContextProvider>
    </I18nextProvider>
  );
}

export default App;
