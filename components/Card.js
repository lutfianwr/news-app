import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Skeleton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { SvgIcon } from "@mui/material";

export default function ActionAreaCard({
  title,
  imageUrl,
  url,
  id,
  description,
  subtitle,
  source,
  date,
  onClickBookmark,
  isBookmark,
  isLoading,
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
    <Card>
      <CardActionArea>
        {isLoading ? (
          <Skeleton variant="rectangular" height={140} />
        ) : (
          <CardMedia
            sx={{ borderRadius: "10px" }}
            component="img"
            height="140"
            image={imageUrl}
            alt={imageUrl || "No image"}
          />
        )}

        <CardContent sx={{ padding: "8px 0" }}>
          {isLoading ? (
            <Skeleton variant="text" height={45} />
          ) : (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              onClick={() => redirectTourl(url)}
            >
              {title}
            </Typography>
          )}

          {isLoading ? (
            <Skeleton variant="text" height={35} width={100} />
          ) : (
            <Container
              sx={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="body2" color="primary.main">
                  {source || subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getHours()}
                </Typography>
              </div>
              <SvgIcon
                onClick={() => onClickBookmark(id)}
                component={
                  isBookmark() === id ? BookmarkIcon : BookmarkBorderIcon
                }
              />
            </Container>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
