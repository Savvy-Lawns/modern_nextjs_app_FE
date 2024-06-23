import { useMediaQuery, Box, Drawer } from "@mui/material";
import MenuLogo from "../shared/logo/menuLogo";
import SidebarItems from "./SidebarItems";
import {baselightTheme} from "@/utils/theme/DefaultColors";
import {
  IconChevronUp,
 
} from "@tabler/icons-react";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement | SVGSVGElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "97%";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexGrow: 2,
          backgroundColor: baselightTheme.palette.primary.light,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="top"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
              backgroundColor: baselightTheme.palette.primary.light,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3} >
            <MenuLogo onClick={onSidebarClose} />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
              
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="top"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          borderRadius: "0px 0px 45px 45px",
          paddingBottom: 1,
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <MenuLogo onClick={onSidebarClose} />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <IconChevronUp onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => onSidebarClose(event)} />      </div>
    </Drawer>
  );
};

export default Sidebar;
