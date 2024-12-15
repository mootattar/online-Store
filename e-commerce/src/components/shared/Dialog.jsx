import "./styles/dialog.css";
import { useDialog } from "./Context/dialogContext";
import { useTranslation } from "react-i18next";
export default function Dialog() {
  const { t } = useTranslation();
  const { isOpen, dialogData, hideDialog } = useDialog();
  if (!isOpen) return null;

  const handleDialogClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="overlay" onClick={hideDialog}>
        <div className="dialog" onClick={handleDialogClick}>
          <div className="warning-icon">⚠️</div>
          <h2>{t(dialogData.title)}</h2>
          <div className="dialog-buttons">
            <button className="btn btn-cancel" onClick={hideDialog}>
              {t("No, Go Back")}
            </button>
            <button
              className="btn btn-delete"
              onClick={() => {
                dialogData.action();
                hideDialog();
              }}
            >
              {t("Yes")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
