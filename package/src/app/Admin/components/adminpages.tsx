"use client";

import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";

import AdminItems from "./items";
import ItemGroup from "./itemgroup";
import { TablerIconsProps } from "@tabler/icons-react";

interface MenuItem {
    id: string;
    title: string;
    icon: (props: TablerIconsProps) => JSX.Element;
    href: string;
    subheader?: string; // Correctly added optional subheader property
  }

const AdminNavBarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item: MenuItem) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <ItemGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <AdminItems
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

export default AdminNavBarItems;