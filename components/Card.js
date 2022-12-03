import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ title, imageUrl, url, description }) {
  const redirectTourl = (url) => {
    window.open(url, "_blank");
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
          <Typography variant="body2" color="text.secondary">
            {description || title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
