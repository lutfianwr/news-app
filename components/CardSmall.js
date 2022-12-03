import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MediaControlCard({
  title,
  imageUrl,
  url,
  description,
  author,
  source,
}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "auto", borderRadius: "10px" }}
        image={imageUrl}
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            // flex: "1 0 auto",
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            padding: "0 0 0 20px",
            justifyContent: "space-between",
          }}
        >
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {source}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
