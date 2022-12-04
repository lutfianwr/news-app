import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from "@mui/icons-material/House";
import SearchIcon from "@mui/icons-material/Search";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/router";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <HideOnScroll {...props}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href="." icon={<HouseIcon />} />
          <BottomNavigationAction
            icon={<TurnedInIcon />}
            onClick={() => router.push("/bookmark")}
          />
          <BottomNavigationAction icon={<SearchIcon />} />
          <BottomNavigationAction
            icon={<PersonIcon />}
            onClick={() => router.push("/profile")}
          />
        </BottomNavigation>
      </HideOnScroll>
    </Box>
  );
}
