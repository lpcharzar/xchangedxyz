const HeroSection = () => {
  return (
    <div className="text-center pt-20 pb-10">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Live — swapping now
      </div>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
        Swap crypto
        <br />
        <span className="text-primary">instantly</span>
      </h1>
      <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
        No registration. No limits. 1,000+ coins supported.
      </p>
    </div>
  );
};

export default HeroSection;
