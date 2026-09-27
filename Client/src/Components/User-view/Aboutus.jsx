import aboutImage from "../../assets/herosection.png";

const AboutSection = () => {
  return (
    <section className="relative px-6 py-24 bg-background text-foreground lg:px-12">
      <div className="grid items-center grid-cols-1 gap-16 mx-auto max-w-7xl lg:grid-cols-2">

        {/* Left – Text */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-primary">
            About Luxora
          </span>

          <h2 className="text-4xl leading-tight font-heading lg:text-5xl">
            Where Craft Meets
            <br />
            Quiet Luxury
          </h2>

          <p className="max-w-xl leading-relaxed text-foreground/70">
            Luxora was born from a belief that true luxury does not shout.
            It is felt in the weight of a chair, the curve of a silhouette,
            and the patience behind every detail.
          </p>

          <p className="max-w-xl leading-relaxed text-foreground/60">
            Each piece we create is designed with restraint, purpose,
            and timeless appeal. Inspired by modern architecture and
            handcrafted traditions, our collections are made to endure
            both time and taste.
          </p>

          <div className="pt-6">
            <button className="btn-outline">
              Discover Our Philosophy
            </button>
          </div>
        </div>

        {/* Right – Image */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-primary/20 to-transparent blur-2xl" />
          <img
            src={aboutImage}
            alt="Luxury craftsmanship"
            className="relative w-full h-[480px] object-cover rounded-3xl shadow-warm"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
