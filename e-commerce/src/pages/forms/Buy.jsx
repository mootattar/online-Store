import { useRef, useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

const PaymentPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  // states
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // refrences
  const cardNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expiryDateRef = useRef(null);
  const cvvRef = useRef(null);

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.cardName.trim()) newErrors.cardName = t("cardNameRequired");
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = t("cardNumberInvalid");
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = t("expiryDateInvalid");
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = t("cvvInvalid");
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  const textFieldSx = {
    "& .MuiInputBase-root": {
      direction: isRTL ? "rtl" : "ltr",
    },
    "& .MuiInputBase-input": {
      textAlign: isRTL ? "right" : "left",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      textAlign: isRTL ? "right" : "left",
    },
    "& .MuiInputLabel-root": {
      left: isRTL ? "inherit" : "2px",
      right: isRTL ? "32px" : "inherit",
      transformOrigin: isRTL ? "right" : "left",
    },
  };

  const textFieldSlotProps = {
    formHelperText: {
      style: {
        textAlign: isRTL ? "right" : "left",
      },
    },
    input: {
      dir: isRTL ? "rtl" : "ltr",
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          {t("Payment Details")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                fullWidth
                inputRef={cardNameRef}
                id="cardName"
                label={t("Card Name")}
                name="cardName"
                autoComplete="cardName"
                autoFocus
                value={formData.cardName}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    cardNumberRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={errors.cardName}
                error={!!errors.cardName}
                slotProps={textFieldSlotProps}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                color="info"
                fullWidth
                inputRef={cardNumberRef}
                id="cardNumber"
                label={t("Card Number")}
                name="cardNumber"
                autoComplete="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    expiryDateRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={errors.cardNumber}
                error={!!errors.cardNumber}
                slotProps={textFieldSlotProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                maxLength={5}
                variant="outlined"
                color="info"
                fullWidth
                inputRef={expiryDateRef}
                id="expiryDate"
                label={t("Expiry Date")}
                name="expiryDate"
                autoComplete="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    cvvRef.current.focus();
                  }
                }}
                sx={textFieldSx}
                helperText={errors.expiryDate}
                error={!!errors.expiryDate}
                slotProps={textFieldSlotProps}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                color="info"
                fullWidth
                inputRef={cvvRef}
                id="cvv"
                label={t("CVV")}
                name="cvv"
                autoComplete="cvv"
                value={formData.cvv}
                onChange={handleChange}
                sx={textFieldSx}
                helperText={errors.cvv}
                error={!!errors.cvv}
                slotProps={textFieldSlotProps}
                maxLength={3}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            {t("Submit Payment")}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PaymentPage;
