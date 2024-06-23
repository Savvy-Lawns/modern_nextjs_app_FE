import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import {baselightTheme} from "@/utils/theme/DefaultColors";

const LinkStyled = styled(Link)(() => ({
  height: "120px",
  width: "100%",
  overflow: "visible",
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "0px 0px  45px 45px",
  backgroundColor: baselightTheme.palette.primary.main, 
  boxShadow: "inset 0px -8px 10px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
  webkitBoxShadow: 'inset 0px -4px 5px 1px rgba(0,0,0,0.75)',
  mozBoxShadow: 'inset 0px -4px 5px 1px rgba(0,0,0,0.75)',
  
}));

// MenuLogo.tsx
interface MenuLogoProps {
    onClick: () => void;
  }

const MenuLogo:React.FC<MenuLogoProps> = ({ onClick }) => {
  return (
    <LinkStyled href="" onClick={onClick}>
      <Image src="/images/logos/SavvyLawnsLogo.png" alt="logo" height={90} width={174}  priority />
    </LinkStyled>
  );
};

export default MenuLogo;
