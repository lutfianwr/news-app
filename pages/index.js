import Card from "../components/Card";
import Loading from "../components/Loading";
import Swip from "../components/Swip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const kategori = [
    { code: "all" },
    { code: "business" },
    { code: "entertainment" },
    { code: "automobile" },
    { code: "science" },
    { code: "sports" },
    { code: "technology" },
    { code: "politics" },
    { code: "startup" },
    { code: "world" },
  ];

  useEffect(() => {
    getNews();
  }, [category]);

  async function getNews() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://inshorts.deta.dev/news?` +
          new URLSearchParams({
            category: category,
          }),
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
      const topnews = data.slice(0, 9);
      setArticles(topnews);
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
        {kategori.map((data, index) => {
          return (
            <SwiperSlide key={index}>
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
                  url={article.readMoreUrl}
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
