import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ title, imageUrl, url, description }) {
  return (
    <Card
      sx={{ maxWidth: 345, display: "flex", justifyContent: "space-between" }}
    >
      <CardMedia component="img" height="80" width="500" image={imageUrl} />
      <CardContent sx={{ padding: "4px !important" }}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <CardActions sx={{ padding: 0 }}>
          <Button size="small">Share</Button>
          <Button size="small">save</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
