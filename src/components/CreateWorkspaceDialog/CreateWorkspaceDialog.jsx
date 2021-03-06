import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { hideCreateWorkspaceDialog } from "../../actions/landingPage";
import {
  createNewWorkspace,
  setWorkspaceName,
  setUsername
} from "../../actions/createWorkspaceDialog";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const CreateWorkspaceDialog = ({
  showCreateWorkspaceDialog,
  hideWorkspaceDialog,
  newWorkspace,
  newWorkspaceName,
  newUsername,
  workspaceName,
  username,
  history
}) => (
  <div>
    <Dialog
      open={showCreateWorkspaceDialog}
      onClose={() => hideWorkspaceDialog()}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name for the workspace and your full name to get
          started.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="room_name"
          label="Workspace Name"
          type="text"
          variant="outlined"
          fullWidth
          value={workspaceName}
          onChange={evt => {
            newWorkspaceName(evt.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="user_name"
          label="User Full Name"
          type="text"
          variant="outlined"
          fullWidth
          value={username}
          onChange={evt => newUsername(evt.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => hideWorkspaceDialog()}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => newWorkspace(history.push)}
        >
          Create Workspace
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

CreateWorkspaceDialog.defaultProps = {
  showCreateWorkspaceDialog: false,
  workspaceName: "",
  username: ""
};

CreateWorkspaceDialog.propTypes = {
  showCreateWorkspaceDialog: PropTypes.bool,
  hideWorkspaceDialog: PropTypes.func.isRequired,
  newWorkspace: PropTypes.func.isRequired,
  newWorkspaceName: PropTypes.func.isRequired,
  newUsername: PropTypes.func.isRequired,
  workspaceName: PropTypes.string,
  username: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({
  landingPage: { showCreateWorkspaceDialog },
  createWorkspaceDialog: { workspaceName, username }
}) => ({
  showCreateWorkspaceDialog,
  workspaceName,
  username
});

const mapDispatchToProps = {
  hideWorkspaceDialog: hideCreateWorkspaceDialog,
  newWorkspace: createNewWorkspace,
  newWorkspaceName: setWorkspaceName,
  newUsername: setUsername
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme({})(withRouter(CreateWorkspaceDialog)));
