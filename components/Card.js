import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({
  author,
  title,
  imageUrl,
  url,
  description,
}) {
  const redirectTourl = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => redirectTourl(url)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={imageUrl || "No image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description || title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
