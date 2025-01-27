import { saveGeneratedText } from './../../Firebase/data';
import React from "react";
import PredictiveText from "../../components/home/services/PredictiveText";
import saveIcon from "../../images/save-icon.png";
import { useNextWord } from "../../store/nextWord";
import { useAuth } from "../../store/auth";
import { AuthSchema } from "../../schema";
import CustomizedSnackbars from "../../components/common/SnackBar";
import TitleModal from "../../components/common/TitleModal";

export default function AutoCompletion() {
  const { currentUser, setIsLoginModalOpen } = useAuth() as AuthSchema;

  const { userText } = useNextWord();

  const [isTitleModalOpen, setIsTitleModalOpen] =
    React.useState<boolean>(false);

  const [title, setTitle] = React.useState<string>("");
  const [snackbar, setSnackbar] = React.useState<boolean>(false);

  const handleSaveClick = async () => {
    if (currentUser !== undefined && currentUser !== null) {
      setIsTitleModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const saveToProfile = async () => {
    if (title.length > 0 && userText.length > 0) {
      await saveGeneratedText({
        title: title,
        text: userText,
      });
      setIsTitleModalOpen(false);
      setSnackbar(true);
    } else {
      // TODO: show snackbar error message
    }
  };

  return (
    <div className="model-page">
      <div className="model-description">
        <div className="title-and-save">
          <h1>Medical Auto Completion</h1>
        </div>

        <p>
          We used a model named Dialo GPT-large, created by Microsoft in 2019 as
          a general-purpose model. We fine-tuned it on medical domain data (from
          medical books and papers) so that the model can assist doctors in
          enhancing their work.
        </p>
        <br />
        <p>
          Start typing and the AI completion will show up. Hit Tab to apply it.
        </p>
      </div>

      <div className="model-section">
        <button className="save-btn" onClick={handleSaveClick}>
          <img src={saveIcon} alt="" />

          <p>Save</p>
        </button>
        <PredictiveText />
      </div>

      <TitleModal
        isTitleModalOpen={isTitleModalOpen}
        setIsTitleModalOpen={setIsTitleModalOpen}
        setTitle={setTitle}
        saveToProfile={saveToProfile}
      />

      <CustomizedSnackbars
        text="Generated text was saved in profile successfully"
        openState={snackbar}
        setOpenState={setSnackbar}
        type="success"
      />
    </div>
  );
}
