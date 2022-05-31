import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import { Box, Typography, useMediaQuery, Paper, Grid } from "@mui/material";
import merch1 from "./assets/merch/merch1.png";
import merch2 from "./assets/merch/merch2.png";
import merch3 from "./assets/merch/merch3.png";
import merch4 from "./assets/merch/merch4.png";
import ErrorBoundary from "./utils/ErrorBoundary";
import AdSense from "react-adsense";
import Footer from "./utils/Footer";
import CustomLink from "./utils/CustomLink";
import Vod from "./vods/Vod";

const merchImages = [
  {
    image: merch1,
    link: "https://dotexe.com/collections/pokelawls/products/pokelawls-smoke-black-tee",
  },
  {
    image: merch2,
    link: "https://dotexe.com/collections/pokelawls/products/pokelawls-kisses-black-tee",
  },
  {
    image: merch3,
    link: "https://dotexe.com/collections/pokelawls/products/pokelawls-kisses-white-tee",
  },
  {
    image: merch4,
    link: "https://dotexe.com/collections/pokelawls/products/pokelawls-kisses-black-hoodie",
  },
];

export default function Frontpage(props) {
  const { channel, VODS_API_BASE } = props;
  const isMobile = useMediaQuery("(max-width: 800px)");
  const [vods, setVods] = React.useState([]);

  useEffect(() => {
    const fetchVods = async () => {
      await fetch(`${VODS_API_BASE}/vods?$limit=10&$sort[createdAt]=-1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setVods(
            response.data
              .filter((vod) => {
                return vod.youtube.length !== 0;
              })
              .slice(0, 3)
          );
        })
        .catch((e) => {
          console.error(e);
        });
    };
    fetchVods();
    return;
  }, [channel, VODS_API_BASE]);

  if (vods.length === 0) return <></>;

  const vodsToUse = isMobile ? vods.slice(0, 2) : vods.slice(0, 3);

  return (
    <SimpleBar style={{ minHeight: 0 }}>
      <Box sx={{ display: "flex", mt: 1, justifyContent: "center" }}>
        <ErrorBoundary>
          <AdSense.Google client="ca-pub-8093490837210586" slot="3667265818" style={{ display: "block" }} format="auto" responsive="true" layoutKey="-gw-1+2a-9x+5c" />
        </ErrorBoundary>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: `${isMobile ? "100%" : "50%"}` }}>
            <Paper sx={{ p: 1, width: "100%" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mb: 2 }}>
                <CustomLink href="/vods">
                  <Typography variant="h6" color="primary">
                    Recent Vods
                  </Typography>
                </CustomLink>
              </Box>
              <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
                {vodsToUse.map((vod, i) => (
                  <Vod key={vod.id} gridSize={4} vod={vod} isMobile={isMobile} />
                ))}
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: `${isMobile ? "100%" : "50%"}` }}>
            <Paper sx={{ p: 1 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mb: 1 }}>
                <CustomLink href="https://dotexe.com/collections/pokelawls" target="_blank" rel="noopener noreferrer">
                  <Typography variant="h6" color="primary">
                    Merch
                  </Typography>
                </CustomLink>
              </Box>
              <Box display="flex" flexWrap="nowrap">
                {merchImages.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        overflow: "hidden",
                        position: "relative",
                        "&:hover": {
                          boxShadow: "0 0 8px #fff",
                        },
                      }}
                    >
                      <a href={item.link} target="_blank" rel="noreferrer noopener">
                        <img alt="" key={index} src={item.image} height="100%" width="100%" />
                      </a>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: `${isMobile ? "100%" : "50%"}` }}>
            <iframe
              title="Player"
              width="100%"
              height="160"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/910917202&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </SimpleBar>
  );
}
