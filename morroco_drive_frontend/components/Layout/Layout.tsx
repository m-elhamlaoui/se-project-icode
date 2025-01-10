import { Grid } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  hideImage?: boolean; // Add this prop
}

function Layout({ children, hideImage = false }: Props) {
  return (
    <div className="h-screen">
      <Grid container>
        <Grid
          item
          xs={12}
          md={hideImage ? 12 : 8} // Take full width if the image is hidden
          lg={hideImage ? 12 : 5} // Adjust the size dynamically
        >
          {children}
        </Grid>
        {!hideImage && ( // Conditionally render the image
          <Grid
            item
            md={4}
            lg={7}
            sx={{
              display: { xs: "none", md: "block" },
            }}
            className="h-screen w-full"
          >
            <img
              src="https://cdn2.hubspot.net/hubfs/6994178/Pictures/Outdoor%20Architecture/UM6P_Campus_Ben-Guerir_Outdoor_Architecture_21.jpg"
              alt=""
              className="w-full h-full object-cover object-right-top"
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Layout;
