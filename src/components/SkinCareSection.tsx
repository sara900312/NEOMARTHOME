import { Sparkles, Zap, TestTube } from "lucide-react";

const skinCareProducts = [
  { icon: Sparkles, title: "تحليل البشرة بالذكاء الاصطناعي", description: "تقنية AI متقدمة لتحليل نوع بشرتك" },
  { icon: Zap, title: "توصيات مخصصة", description: "منتجات موصى بها حسب احتياجات بشرتك" },
  { icon: TestTube, title: "مستحضرات طبيعية", description: "منتجات عناية بالبشرة والشعر من مكونات طبيعية" },
];

const SkinCareSection = () => {
  return (
    <section className="container py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">عناية بالبشرة والشعر</h2>
          <p className="text-muted-foreground">منتجات عناية متخصصة مع تحليل ذكي</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {skinCareProducts.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinCareSection;
