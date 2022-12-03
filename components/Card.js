import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({
  title,
  imageUrl,
  url,
  description,
  subtitle,
  source,
  date,
}) {
  const redirectTourl = (url) => {
    window.open(url, "_blank");
  };
  const getHours = () => {
    const nowDate = Date.now();
    const hour = (nowDate - date) / (1000 * 60 * 60);
    if (hour < 24) {
      return Math.ceil(hour) + " hours ago";
    } else {
      return Math.ceil(hour / 24) + " days ago";
    }
  };

  return (
    <Card onClick={() => redirectTourl(url)}>
      <CardActionArea>
        <CardMedia
          sx={{ borderRadius: "10px" }}
          component="img"
          height="140"
          image={imageUrl}
          alt={imageUrl || "No image"}
        />
        <CardContent sx={{ padding: "8px 0" }}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {source || subtitle}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {getHours()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
