import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import AddIcon from "@material-ui/icons/Add";
import WorkspacePageContent from "../WorkspacePageContent/WorkspacePageContent";
import {
  showDrawer,
  hideDrawer,
  fabChecked,
  fabHidden,
  showCreateUserDialog
} from "../../actions/workspacePage";
import NoteDialog from "../NoteDialog/NoteDialog";
import { editNote } from "../../actions/workspaceCard";
import AddUserDialog from "../AddUserDialog/AddUserDialog";

const drawerWidth = 240;

const styles = theme => ({
  page: {
    height: "-webkit-fill-available"
  },
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 0.5,
    marginRight: theme.spacing.unit * 4.5
  },
  addUserButton: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: theme.spacing.unit * 1.5
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: theme.palette.primary.main
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    },
    backgroundColor: theme.palette.primary.main
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  fabDiv: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    width: "100%",
    bottom: theme.spacing.unit * 4,
    alignItems: "center"
  },
  fab: {
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"
  },
  fabExtendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const users = ["Alex", "Price", "John", "Jim"];
const noteCategories = ["Bookmarked Notes", "All Notes"];

function WorkspacePage(props) {
  const {
    classes,
    theme,
    drawerOpen,
    showCreateUserDialog: showUserDialog,
    workspaceName
  } = props;
  const colorWhite = {
    color: theme.palette.primary.contrastText
  };
  const colorSecondary = {
    color: theme.palette.secondary.main
  };
  return (
    <div className={classes.page}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen
          })}
        >
          <Toolbar disableGutters={!drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => props.showDrawer()}
              className={classNames(classes.menuButton, {
                [classes.hide]: drawerOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {workspaceName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar}>
            <Typography variant="h5" style={colorWhite}>
              puffnote
            </Typography>
            <IconButton style={colorWhite} onClick={() => props.hideDrawer()}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider light />
          <List>
            {noteCategories.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon style={colorWhite}>
                  {index % 2 === 0 ? (
                    <BookmarkIcon style={colorSecondary} />
                  ) : (
                    <AppsIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" style={colorWhite}>
                      {text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider light />
          <List>
            <ListItem onClick={() => showUserDialog()} button key="Settings">
              <ListItemIcon
                onClick={() => showUserDialog()}
                style={colorSecondary}
              >
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" style={colorWhite}>
                    Add User
                  </Typography>
                }
              />
            </ListItem>
            {users.map(text => (
              <ListItem button key={text}>
                <ListItemIcon style={colorWhite}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" style={colorWhite}>
                      {text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider light />
          <ListItem button key="Settings">
            <ListItemIcon style={colorSecondary}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" style={colorWhite}>
                  Settings
                </Typography>
              }
            />
          </ListItem>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <WorkspacePageContent notes />
        </main>
      </div>
      <div className={classes.fabDiv}>
        <Fab
          color="primary"
          variant="extended"
          aria-label="Add"
          className={classes.fab}
          onClick={() => props.newNote()}
        >
          <AddIcon className={classes.fabExtendedIcon} />
          Add
        </Fab>
      </div>
      <NoteDialog />
      <AddUserDialog />
    </div>
  );
}

WorkspacePage.defaultProps = {
  workspaceName: "Default Workspace"
};

WorkspacePage.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  hideDrawer: PropTypes.func.isRequired,
  fabChecked: PropTypes.func.isRequired,
  fabHidden: PropTypes.func.isRequired,
  newNote: PropTypes.func.isRequired,
  showCreateUserDialog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  fabClicked: PropTypes.bool.isRequired,
  workspaceName: PropTypes.string
};

const mapStateToProps = ({
  workspacePage: { drawerOpen, fabClicked, workspaceName }
}) => ({
  drawerOpen,
  fabClicked,
  workspaceName
});

const mapDispatchToProps = {
  showDrawer,
  hideDrawer,
  fabChecked,
  fabHidden,
  newNote: editNote,
  showCreateUserDialog
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(WorkspacePage));
