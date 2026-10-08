import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import LatestNews from "@/components/LatestNews";
import Footer from "@/components/Footer";
import SkinCareSection from "@/components/SkinCareSection";
import beautyAnalysis from "@/assets/beauty-analysis.svg";

const cakeImage = "https://cdn.builder.io/api/v1/image/assets%2F7dd339db8a7f43408f9f7869050aa0c4%2Fcdd5c911120b4f74a8a0614d00f0c00e?format=webp&width=800&height=1200";
const beautyHero = "https://cdn.builder.io/api/v1/image/assets%2F7dd339db8a7f43408f9f7869050aa0c4%2Ffdcc65e3f60f42b096c9ead8ba9f104e?format=webp&width=800&height=1200";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Category Cards */}
        <section className="container grid sm:grid-cols-2 gap-5 pb-6">
          <CategoryCard
            title="نيومارت كيك"
            description="أجود أنواع الكيك والحلويات الطازة"
            buttonText="قريبا"
            image={cakeImage}
            route="/cakes"
            isDisabled={true}
          />
          <CategoryCard
            title="جمال وعناية"
            description="منتجات العناية بالبشرة والمكياج"
            buttonText="تسوّق الآن"
            image={beautyHero}
            route="/beauty"
          />
        </section>


        <SkinCareSection />
        <LatestNews />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
