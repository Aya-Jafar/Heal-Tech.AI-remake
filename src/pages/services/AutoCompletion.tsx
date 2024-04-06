import React from "react";
import PredictiveText from "../../components/PredictiveText";
import saveIcon from "../../images/save-icon.png";
import { saveGeneratedText } from "../../Firebase/data";
import { useNextWord } from "../../store/nextWord";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { saveBoxStyle } from "../../utils/dynamicStyles";
import { TextField } from "@mui/material";
import { useAuth } from "../../store/auth";
import { AuthSchema } from "../../schema";
import CustomizedSnackbars from "../../components/SnackBar";

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

      <Modal open={isTitleModalOpen} onClose={() => setIsTitleModalOpen(false)}>
        <Box sx={saveBoxStyle}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Save to your profile
          </Typography>
          <form action="" style={{ marginTop: "60px" }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: "20px" }}
              sx={{
                width: "100%",
                "& label": {
                  color: "white", // Label color
                },
                "& fieldset": {
                  borderColor: "white !important", // Border color
                },
              }}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
              }}
            />
          </form>

          <br />
          <br />
          <center>
            <button className="btn" onClick={saveToProfile}>
              <strong>Save</strong>
            </button>
          </center>
        </Box>
      </Modal>
      <CustomizedSnackbars
        text="Generated text was saved in profile successfully"
        openState={snackbar}
        setOpenState={setSnackbar}
      />
    </div>
  );
}
