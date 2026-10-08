import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

interface NewsItem {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  link?: string;
  display_order: number;
  is_active: boolean;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [otherNews, setOtherNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch specific news item
      const { data: newsData, error: newsError } = await supabase
        .from("news_updates")
        .select("*")
        .eq("id", id)
        .single();

      if (newsError) {
        throw new Error("الخبر غير موجود");
      }

      if (!newsData) {
        throw new Error("الخبر غير موجود");
      }

      setNews(newsData);

      // Fetch other active news (excluding current one)
      const { data: otherData, error: otherError } = await supabase
        .from("news_updates")
        .select("*")
        .eq("is_active", true)
        .neq("id", id)
        .order("display_order", { ascending: true })
        .limit(6);

      if (!otherError && otherData) {
        setOtherNews(otherData);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("فشل تحميل الخبر. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex justify-center items-center py-12">
            <div className="text-center text-muted-foreground">جاري تحميل الخبر...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <div className="text-red-500 mb-4">{error || "الخبر غير موجود"}</div>
            <Link to="/" className="text-sm font-semibold neomart-logo hover:opacity-80 transition-opacity">
              العودة للرئيسية
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* News Detail */}
        <article className="container py-8 lg:py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold neomart-logo hover:opacity-80 transition-opacity mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          {/* Main Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-full object-cover aspect-[16/10]"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{news.title}</h1>

          {/* Description */}
          <div className="max-w-3xl prose prose-invert">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {news.description}
            </p>
          </div>

          {/* External Link */}
          {news.link && (
            <div className="mt-6">
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                اقرأ الخبر الكامل
              </a>
            </div>
          )}
        </article>

        {/* Other News Section */}
        {otherNews.length > 0 && (
          <section className="container pb-14">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">أخبار أخرى</h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                اطلع على المزيد من أخبار NEOMART
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherNews.map((post) => (
                <article
                  key={post.id || post.title}
                  className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/news/${post.id}`)}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 leading-relaxed">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <div className="text-sm font-semibold neomart-logo inline-block hover:opacity-80 transition-opacity">
                      اقرأ المزيد ←
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
