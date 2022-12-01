import Card from "../components/Card";
import Loading from "../components/Loading";
import Chip from "@mui/material/Chip";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
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
        `https://inshorts.me/news/topics/${category}?offset=0&limit=5`,
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
      setArticles(data.articles);
      setLoading(false);
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

      <Swiper spaceBetween={4} slidesPerView="auto">
        {kategori.map((data) => {
          return (
            <SwiperSlide key={data.id}>
              <Chip
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

      <div className="news">
        {!loading &&
          articles.map((article) => {
            return (
              <div className="card" key={article.url}>
                <Card
                  title={article.title}
                  imageUrl={article.imageUrl}
                  url={article.sourceUrl}
                  description={article.content}
                  date={article.date}
                  time={article.time}
                />
              </div>
            );
          })}

        {loading && <Loading />}
      </div>
    </Layout>
  );
}
