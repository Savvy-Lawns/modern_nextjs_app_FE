import React from "react";
import { Card, CardContent, Typography, Stack, Box,  } from "@mui/material";
import { baselightTheme } from "@/utils/theme/DefaultColors";

type Props = {
  title?: string | JSX.Element;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element | any;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element | any;
  middlecontent?: string | JSX.Element;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}: Props) => {
  return (
    <Card sx={[styles.Card]} elevation={1} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ px: "8px", py:"15px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={0}
              justifyContent="center"
              alignItems={["center"]}
              mb={1}
            >
              <Box style={styles.titleBox}>
                {title ? <Typography variant="h5">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;

const styles = {
 
  Card: {
   marginBottom:"20px",
  paddingBottom:"35px",
  borderRadius: "25px",
  backgroundColor: '#fff', 
  boxShadow: "inset 0px -6px 5px 1px rgba(0,0,0,0.75), 0px 7px 10px 1px rgba(0,0,0,0.75)",
  
  border: "1px solid #000",
  },
  titleBox: {
    marginBottom: "10px",
  },
};