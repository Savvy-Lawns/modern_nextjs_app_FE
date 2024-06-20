import {
  IconAperture,
  IconUserCircle,
  IconListCheck,
  IconLogin,
  IconCalendar,
  IconUserShield,
  IconUserPlus,
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
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUserCircle,
    href: "/utilities/shadow",
  }, 
  {
    id: uniqueId(),
    title: "Admin",
    icon: IconUserShield,
    href: "/authentication/register",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogin,
    href: "/authentication/login",
  },
 
  
  
  
];

export default Menuitems;
