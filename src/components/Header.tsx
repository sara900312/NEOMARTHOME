const Header = () => {
  return (
    <header className="relative flex flex-col items-center justify-center pt-16 pb-10 sm:pt-24 sm:pb-14 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[hsl(270,100%,50%)] opacity-[0.08] blur-[100px] pointer-events-none" />

      {/* Logo */}
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight neomart-logo select-none mb-3">
        NEOMART
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">تقنية متطورة وجمال لا يُقاوم — كل ذلك في مكان واحد</p>
    </header>
  );
};

export default Header;
