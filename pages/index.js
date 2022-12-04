import HeadCard from "../components/Card";
import CardSmall from "../components/CardSmall";
import Loading from "../components/Loading";
import Chip from "@mui/material/Chip";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Skeleton, Box, Card } from "@mui/material";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [headline, setHeadline] = useState([]);
  const [category, setCategory] = useState("all");
  const [label, setLabel] = useState("All");
  const [loading, setLoading] = useState(false);

  const kategori = [
    { id: 1, code: "all", label: "All" },
    { id: 2, code: "business", label: "Business" },
    { id: 3, code: "entertainment", label: "Entertainment" },
    { id: 4, code: "automobile", label: "Automobile" },
    { id: 5, code: "science", label: "Science" },
    { id: 6, code: "sports", label: "Sports" },
    { id: 7, code: "technology", label: "Technology" },
    { id: 8, code: "miscellaneous", label: "Miscellaneous" },
    { id: 9, code: "Health___Fitness", label: "Health & Fitness" },
    { id: 10, code: "politics", label: "Politics" },
    { id: 11, code: "Coronavirus", label: "Coronavirus" },
    { id: 12, code: "startup", label: "Startup" },
    { id: 13, code: "world", label: "World" },
    { id: 14, code: "travel", label: "Travel" },
    { id: 15, code: "fashion", label: "Fashion" },
    { id: 16, code: "education", label: "Education" },
  ];

  useEffect(() => {
    getNews();
  }, [category]);

  async function getNews() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://inshorts.me/news/topics/${category}?offset=0&limit=10`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const { data } = await response.json();
      const headlines = data.articles.slice(2, 6);
      setArticles(data.articles);
      setHeadline(headlines);
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/404");
    }
  }

  const isBookmark = (item) => {
    const temp = localStorage.getItem("bookmark");
    if (temp && temp.length > 99) {
      const tempData = JSON.parse(temp);
      const find = tempData.find((data) => data.hashId === item.hashId);
      if (find) return find.hashId;
    }
  };

  const handleBookmark = (item) => {
    setLoading(true);
    const temp = localStorage.getItem("bookmark");
    if (temp || temp != null) {
      const tempData = JSON.parse(temp);
      const find = tempData.find((data) => data.hashId === item.hashId);
      if (find) {
        handleRemove(item);
        return;
      }
    }
    if (temp) {
      const tempData = JSON.parse(temp);
      tempData.push(item);
      localStorage.setItem("bookmark", JSON.stringify(tempData));
    } else {
      localStorage.setItem("bookmark", JSON.stringify([item]));
    }
    setTimeout(() => setLoading(false), 500);
  };

  const handleRemove = (item) => {
    const temp = localStorage.getItem("bookmark");
    const tempData = JSON.parse(temp);
    const tempFilter = tempData.filter((data) => data.hashId !== item.hashId);
    localStorage.setItem("bookmark", JSON.stringify(tempFilter));
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Layout>
      <Head>
        <title>Mak News</title>
        <meta name="News application" content="Mobile news application" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Swiper spaceBetween={4} slidesPerView="auto" id="category">
        {kategori.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <Chip
                sx={{ borderRadius: "10px" }}
                id="category"
                color="primary"
                label={data.label}
                variant={data.code != category ? `outlined` : ""}
                onClick={() => {
                  setCategory(data.code), setLabel(data.label);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Container className="news" sx={{ marginBottom: 7 }}>
        {category === "all" && (
          <div className="top-news">
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ marginBottom: 1, fontWeight: "bold" }}
            >
              Top News
            </Typography>

            <Swiper
              modules={[Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {headline.map((article) => {
                return (
                  <SwiperSlide key={article.url}>
                    <div className="card">
                      <HeadCard
                        title={article.title}
                        imageUrl={article.imageUrl}
                        url={article.sourceUrl}
                        description={article.content}
                        time={article.time}
                        source={article.sourceName}
                        subtitle={article.subtitle}
                        date={article.createdAt}
                        id={article.hashId}
                        onClickBookmark={() => handleBookmark(article)}
                        isBookmark={() => isBookmark(article)}
                        isLoading={loading}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        {
          <div>
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{
                marginBottom: 1,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {category === "all" ? "trending" : label}
            </Typography>

            {articles.map((article) => {
              return (
                <div className="card" key={article.url}>
                  <CardSmall
                    title={article.title}
                    imageUrl={article.imageUrl}
                    url={article.sourceUrl}
                    description={article.content}
                    time={article.time}
                    author={article.authorName}
                    source={article.sourceName}
                    date={article.createdAt}
                    id={article.hashId}
                    onClickBookmark={() => handleBookmark(article)}
                    isBookmark={() => isBookmark(article)}
                    isLoading={loading}
                  />
                </div>
              );
            })}
          </div>
        }
      </Container>
    </Layout>
  );
}
