import Card from "../components/Card";
import Loading from "../components/Loading";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

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
    fetchData();
  }, [category]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://inshorts.deta.dev/news?` +
        new URLSearchParams({
          category: category,
        })
    );
    res.status != 200 && router.push("/error");
    const { data } = await res.json();
    const sliced = data.slice(0, 9);
    setArticles(sliced);
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Mak News</title>
        <meta name="News application" content="Mobile news application" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Stack className="chip" direction="row" spacing={1}>
        {kategori.map((data, index) => {
          return (
            <Chip
              id="category"
              color="primary"
              key={index}
              label={data.code}
              variant={data.code != category ? `outlined` : ""}
              onClick={() => {
                setCategory(data.code);
              }}
            />
          );
        })}
      </Stack>

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
