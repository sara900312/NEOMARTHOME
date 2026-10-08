interface CategoryCardProps {
  title: string;
  description: string;
  buttonText: string;
  image?: string | null;
  bgColor?: string;
  route: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

const CategoryCard = ({ title, description, buttonText, image, bgColor, route, isExternal, isDisabled }: CategoryCardProps) => {
  const LinkComponent = isExternal ? 'a' : 'a';
  const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={isDisabled ? undefined : route}
      {...linkProps}
      aria-disabled={isDisabled || undefined}
      className={`group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-500 border block no-underline ${isDisabled ? 'cursor-default' : 'cursor-pointer hover:shadow-xl'}`}
    >
      <div className={`aspect-[4/3] sm:aspect-[16/10] overflow-hidden ${!image ? `bg-gradient-to-br ${bgColor || 'from-blue-100 to-cyan-200'}` : ''}`}>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-foreground/10 to-transparent flex flex-col items-center justify-end" />
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1">{title}</h2>
        <p className="text-primary-foreground/80 text-sm mb-4">{description}</p>
        <div
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
            isDisabled
              ? 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:brightness-110'
          }`}
        >
          {buttonText}
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
