import {
  IconUserCircle,
  IconListCheck,
  IconLogin,
  IconCalendar,
  IconUserShield,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  

  {
    id: uniqueId(),
    title: "Today's Shift",
    icon: IconListCheck,
    href: "/",
  },
 
  {
    id: uniqueId(),
    title: "Schedule",
    icon: IconCalendar,
    href: "/schedule",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserCircle,
    href: "/profile",
  }, 
  {
    id: uniqueId(),
    title: "Admin",
    icon: IconUserShield,
    href: "/Admin",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogin,
    href: "/authentication/login",
  },
 
  
  
  
];

export default Menuitems;
