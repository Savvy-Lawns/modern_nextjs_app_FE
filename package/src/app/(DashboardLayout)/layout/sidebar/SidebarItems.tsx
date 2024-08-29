import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

// Define the interface for menu items
interface MenuItem {
  id: string;
  title: string;
  icon: (props: any) => JSX.Element; // Assuming TablerIconsProps type or similar for props
  href: string;
  subheader?: string; // Optional subheader property
}

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item: MenuItem) => { // Use the MenuItem interface
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;