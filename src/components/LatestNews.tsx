import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface NewsItem {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  link?: string;
  display_order: number;
  is_active: boolean;
}

const LatestNews = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("news_updates")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      setPosts(data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("فشل تحميل الأخبار. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">آخر الأخبار والتحديثات</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          تابع جديد المنتجات والعروض والتحديثات في NEOMART
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center text-muted-foreground">جاري تحميل الأخبار...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center text-red-500">{error}</div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center text-muted-foreground">لا توجد أخبار متاحة حالياً</div>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.description}</p>
                <div className="text-sm font-semibold neomart-logo inline-block hover:opacity-80 transition-opacity">
                  اقرأ المزيد ←
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
