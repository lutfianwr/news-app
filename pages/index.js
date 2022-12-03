import Card from "../components/Card";
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
  const [loading, setLoading] = useState(false);

  const kategori = [
    { id: 1, code: "all" },
    { id: 2, code: "business" },
    { id: 3, code: "entertainment" },
    { id: 4, code: "automobile" },
    { id: 5, code: "science" },
    { id: 6, code: "sports" },
    { id: 7, code: "technology" },
    { id: 8, code: "miscellaneous" },
    { id: 9, code: "Health___Fitness" },
    { id: 10, code: "politics" },
    { id: 11, code: "Coronavirus" },
    { id: 12, code: "startup" },
    { id: 13, code: "world" },
    { id: 14, code: "travel" },
    { id: 15, code: "fashion" },
    { id: 16, code: "education" },
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
      console.log(headlines);
    } catch (err) {
      console.log(err);
      router.push("/error");
    }
  }

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
                label={data.code}
                variant={data.code != category ? `outlined` : ""}
                onClick={() => {
                  setCategory(data.code);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Container className="news">
        {!loading && category === "all" && (
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
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {headline.map((article) => {
                return (
                  <SwiperSlide key={article.url}>
                    <div className="card">
                      <Card
                        title={article.title}
                        imageUrl={article.imageUrl}
                        url={article.sourceUrl}
                        description={article.content}
                        date={article.date}
                        time={article.time}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        {!loading && (
          <div id="trending">
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
              {category === "all" ? "trending" : category}
            </Typography>

            {articles.map((article) => {
              return (
                <div className="card" key={article.url}>
                  <CardSmall
                    title={article.title}
                    imageUrl={article.imageUrl}
                    url={article.sourceUrl}
                    description={article.content}
                    date={article.date}
                    time={article.time}
                    author={article.authorName}
                    source={article.sourceName}
                  />
                </div>
              );
            })}
          </div>
        )}

        {loading && <Loading />}
      </Container>
    </Layout>
  );
}
