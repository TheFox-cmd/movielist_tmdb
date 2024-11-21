import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { LoginContext } from "../context/LoginContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { userData, setUserData } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("Header Re-rendered - userData:", userData);
  }, [userData]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserData(null);
    setAnchorEl(null);
    localStorage.removeItem("userData");

    navigate("/");
  };

  return (
    <>
      <Grid container alignItems="center" sx={{ backgroundColor: "#3f51b5" }}>
        <Box
          component="img"
          sx={{
            width: "100px",
            height: "70px",
            padding: "20px",
            margin: "0 100px",
          }}
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB Logo"
        />
        <Grid container justifyContent="space-between" flexGrow="1" alignItems="center">
          <Grid container>
            <Link className="link" to="/">
              HOME
            </Link>
            <Link to="/favorite" className="link">
              FAVORITE
            </Link>
            <Link to="/rated" className="link">
              RATED
            </Link>
          </Grid>
          {userData ? (
            <>
              <Button onClick={handleOpen} sx={{
                color: "white",
                textAlign: "center",
                fontSize: "24px",
                marginRight: "40px",
                textDecoration: "none",
              }}>
                {userData.username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login" className="link">
              LOGIN
            </Link>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
