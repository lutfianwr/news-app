import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { SvgIcon } from "@mui/material";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

export default function MediaControlCard({
  title,
  imageUrl,
  url,
  description,
  author,
  source,
  id,
  date,
  onClickBookmark,
  isBookmark,
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
    <Card sx={{ display: "flex", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "auto", borderRadius: "10px" }}
        image={imageUrl}
        alt={title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContentNoPadding
          sx={{
            minHeight: 100,
            display: "flex",
            flexDirection: "column",
            padding: "0 0 0 20px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="div"
            variant="h6"
            onClick={() => redirectTourl(url)}
          >
            {title}
          </Typography>
          <Container
            sx={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography variant="body2" color="primary.main" component="div">
                {source}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
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
        </CardContentNoPadding>
      </Box>
    </Card>
  );
}
