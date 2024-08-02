import { IconChecklist, IconFileDollar, IconHome, IconShovel, IconTrees, IconUsers, IconReportMoney, IconReceipt2 } from "@tabler/icons-react";
import {
    IconUserCircle,
    IconListCheck,
    IconLogin,
    IconCalendar,
    IconUserShield,
    IconSteeringWheel,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
import { title } from "process";
  
  const Menuitems = [
    
  
    {
      id: uniqueId(),
      title: "Quotes",
      icon: IconTrees,
      href: "/Admin/quote",
    },
   
    {
      id: uniqueId(),
      title: "Services",
      icon: IconChecklist,
      href: "/Admin/services",
    },
    
    {
      id: uniqueId(),
      title: "Customers",
      icon: IconHome,
      href: "/Admin/customers",
    },
    {
      id: uniqueId(),
      title: "Users",
      icon: IconUsers,
      href: "/Admin/users",
    },
    {
      id: uniqueId(),
      title: "Billing",
      icon: IconReceipt2,
      href: "/Admin/billing",
    },
    {
        id: uniqueId(),
        title: "Finance",
        icon: IconFileDollar,
        href: "/Admin/finance",
      },
    
    {
      id: uniqueId(),
      title: "Expenses",
      icon: IconReportMoney,
      href: "/Admin/expenses",
    }
    
  ];
  
  export default Menuitems;
  