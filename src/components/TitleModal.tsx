import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import {
  fieldsetStyles,
  inputTextStyles,
  labelStyles,
  saveBoxStyle,
} from "../utils/dynamicStyles";

interface TitleFormProps {
  isTitleModalOpen: boolean;
  setIsTitleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  saveToProfile: React.MouseEventHandler<HTMLButtonElement>;
}

function TitleModal({
  isTitleModalOpen,
  setIsTitleModalOpen,
  setTitle,
  saveToProfile,
}: TitleFormProps) {
  return (
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
            style={{ marginBottom: "20px", width: "100%" }}
            sx={{
              "& label": labelStyles,
              "& fieldset": fieldsetStyles,
            }}
            inputProps={{
              style: inputTextStyles,
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
  );
}

export default TitleModal;
