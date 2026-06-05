import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Menu, X, Leaf, HeartPulse, MonitorSmartphone, Sprout, Users, Twitter, Linkedin, BookOpen, ExternalLink, ArrowRight, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Journal Issues", href: "#issues" },
  { name: "Editorial Board", href: "#board" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex flex-col">
          <a href="#home" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            JISCo
          </a>
          <span className="hidden md:block text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-1">
            Journal on Interdisciplinary Science & Community
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif px-6 rounded-none">
            Submit Paper
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-lg font-medium text-foreground block p-2 border-b border-border/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif w-full rounded-none mt-2">
            Submit Paper
          </Button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-orb-pattern overflow-hidden">
      {/* Third orb — centre top for extra atmospheric depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(232,160,32,0.10) 0%, rgba(232,160,32,0.03) 55%, transparent 75%)", filter: "blur(90px)" }}
      />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Call for Papers 2025
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 text-foreground">
                Advancing Knowledge <br />
                <span className="text-primary italic font-light">Across Disciplines</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                JISCo publishes peer-reviewed, interdisciplinary research connecting scientific inquiry with community impact across Indonesia and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif rounded-none px-8 text-lg h-14">
                  Browse Issues
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-serif rounded-none px-8 text-lg h-14">
                  Submit Manuscript
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] bg-secondary border border-border p-6 flex flex-col justify-between"
            >
              <div className="w-16 h-1 bg-primary mb-8" />
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-bold mb-4">Latest Issue</h3>
                <p className="font-mono text-sm text-muted-foreground mb-2">Vol 3. No 2 | Dec 2024</p>
                <p className="text-sm text-foreground/80 line-clamp-4">
                  Featuring special reports on sustainable urban development, community health initiatives, and digital transformation in agriculture.
                </p>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto flex justify-start w-fit group">
                Read Issue <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-y border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Published Articles", value: "1,200+" },
              { label: "Countries", value: "48" },
              { label: "Peer Reviewers", value: "300+" },
              { label: "Impact Factor", value: "2.8" }
            ].map((stat, i) => (
              <div key={i} className="py-8 px-4 text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MaintenanceOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="blur-[6px] opacity-50 pointer-events-none select-none"
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 bg-background/80 backdrop-blur-md border border-primary/30 px-8 py-6 text-center shadow-xl">
          <Construction className="w-8 h-8 text-primary" />
          <span className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Under Maintenance
          </span>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Temporarily Unavailable
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedArticles() {
  const articles = [
    {
      tag: "Environmental Science",
      title: "Community-Based Water Management in Rural Java: A Participatory Approach",
      author: "Dr. Sari Dewi Rahayu",
      abstract: "This study examines community-led water governance frameworks in three rural Javanese villages, revealing how participatory resource management strengthens both ecological resilience and social cohesion.",
      date: "December 2024",
      issue: "Vol 3 No 2"
    },
    {
      tag: "Digital Agriculture",
      title: "Impact of Digital Literacy Programs on Agricultural Productivity in Eastern Indonesia",
      author: "Prof. Ahmad Fauzi",
      abstract: "A longitudinal analysis of 12 digital literacy interventions across Eastern Indonesia demonstrates measurable gains in crop yield optimization and market access among smallholder farmers.",
      date: "December 2024",
      issue: "Vol 3 No 2"
    },
    {
      tag: "Urban Policy",
      title: "Intersectional Analysis of Urban Waste Management Policies in Tier-2 Cities",
      author: "Dr. Putri Handayani",
      abstract: "Examining waste management policy through intersectional lenses reveals systemic disparities in service delivery across socioeconomic strata in five Indonesian tier-2 cities.",
      date: "June 2024",
      issue: "Vol 3 No 1"
    }
  ];

  return (
    <section id="articles" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block relative">
            Featured Research
            <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-primary" />
          </h2>
        </div>

        <MaintenanceOverlay>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main featured article */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-card border border-border p-8 md:p-12 hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <div className="mb-6 flex justify-between items-start">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
                {articles[0].tag}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{articles[0].issue}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
              {articles[0].title}
            </h3>
            <p className="text-sm font-medium mb-6 text-foreground/80">{articles[0].author}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {articles[0].abstract}
            </p>
            <div className="flex justify-between items-center border-t border-border pt-6">
              <span className="font-mono text-sm text-muted-foreground">{articles[0].date}</span>
              <span className="text-primary font-serif font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          {/* Secondary featured articles */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {articles.slice(1).map((article, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (idx + 1) }}
                className="bg-card border border-border p-6 md:p-8 hover:border-primary/50 transition-colors group cursor-pointer flex-1 flex flex-col"
              >
                <div className="mb-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider">
                    {article.tag}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs font-medium mb-4 text-foreground/80">{article.author}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {article.abstract}
                </p>
                <div className="flex justify-between items-center border-t border-border pt-4 mt-auto">
                  <span className="font-mono text-xs text-muted-foreground">{article.date}</span>
                  <span className="text-primary font-serif text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </MaintenanceOverlay>
      </div>
    </section>
  );
}

function ResearchDomains() {
  const domains = [
    { icon: <Leaf className="w-8 h-8" />, name: "Environmental Science", desc: "Climate change, ecology, and sustainable resource management." },
    { icon: <HeartPulse className="w-8 h-8" />, name: "Public Health", desc: "Epidemiology, community medicine, and health policy." },
    { icon: <Users className="w-8 h-8" />, name: "Social Engineering", desc: "Societal structures, urban planning, and human behavior." },
    { icon: <MonitorSmartphone className="w-8 h-8" />, name: "Technology & Society", desc: "Digital ethics, ICT integration, and human-computer interaction." },
    { icon: <Sprout className="w-8 h-8" />, name: "Agricultural Innovation", desc: "Agri-tech, food security, and rural economy." },
    { icon: <BookOpen className="w-8 h-8" />, name: "Community Development", desc: "Grassroots initiatives, education, and capacity building." },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Interdisciplinary Research Domains</h2>
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">Cakupan Penelitian Interdisipliner</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border p-8 hover:border-primary/50 transition-colors"
            >
              <div className="text-primary mb-6">{domain.icon}</div>
              <h3 className="text-xl font-serif font-bold mb-3">{domain.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{domain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionProcess() {
  const steps = [
    { num: "01", title: "Submit", desc: "Upload manuscript via our online system" },
    { num: "02", title: "Peer Review", desc: "Double-blind review by domain experts (4–8 weeks)" },
    { num: "03", title: "Revision", desc: "Revise based on reviewer feedback" },
    { num: "04", title: "Publication", desc: "Accepted papers published in next available issue" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block relative">
            How to Submit Your Research
            <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-primary" />
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border hidden lg:block -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background lg:bg-transparent lg:px-4"
              >
                <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-serif font-bold text-xl mb-6 lg:mx-auto">
                  {step.num}
                </div>
                <div className="lg:text-center">
                  <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif px-8 py-6 rounded-none text-lg">
            Start Submission
          </Button>
        </div>
      </div>
    </section>
  );
}

function LatestIssues() {
  const issues = [
    { vol: "Vol. 3 No. 2", date: "December 2024", articles: 12, gradient: "from-background to-primary/20" },
    { vol: "Vol. 3 No. 1", date: "June 2024", articles: 10, gradient: "from-background to-emerald-900/40" },
    { vol: "Vol. 2 No. 2", date: "December 2023", articles: 11, gradient: "from-background to-slate-800/60" },
  ];

  return (
    <section id="issues" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block relative">
            Latest Journal Issues
            <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-primary" />
          </h2>
          <Button variant="link" className="text-primary font-serif p-0 text-lg group">
            View All Issues <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${issue.gradient} border border-border aspect-[3/4] p-8 flex flex-col justify-between hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <span className="font-mono text-sm text-primary uppercase tracking-widest">{issue.date}</span>
                <h3 className="text-3xl font-serif font-bold mt-4">{issue.vol}</h3>
                <p className="text-muted-foreground mt-2">{issue.articles} Articles</p>
              </div>
              <div className="relative z-10">
                <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-serif rounded-none transition-all">
                  View Issue
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBoard() {
  const board = [
    { name: "Prof. Dr. Budi Santoso", role: "Editor-in-Chief", inst: "Universitas Gadjah Mada", exp: "Environmental Policy & Governance" },
    { name: "Dr. Rina Puspita Sari", role: "Associate Editor", inst: "Institut Teknologi Bandung", exp: "Digital Agriculture & Rural Development" },
    { name: "Prof. Ahmad Wicaksono", role: "Associate Editor", inst: "Universitas Indonesia", exp: "Public Health & Social Systems" },
  ];

  return (
    <section id="board" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block relative">
            Editorial Board
            <div className="absolute -bottom-4 left-0 w-1/2 h-1 bg-primary" />
          </h2>
        </div>

        <MaintenanceOverlay>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {board.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border-y border-r border-border border-l-4 border-l-primary p-6 md:p-8"
            >
              <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border/50">{member.inst}</p>
              <div className="mt-auto">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-2">Expertise</p>
                <p className="text-sm font-medium">{member.exp}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </MaintenanceOverlay>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-secondary p-12 md:p-24 flex flex-col justify-center items-start">
          <span className="font-mono text-primary text-sm uppercase tracking-widest mb-4">For Authors</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Submit?</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Review our submission guidelines and ensure your manuscript meets our interdisciplinary scope. 
            <br/><br/>
            <span className="font-mono text-xs text-foreground bg-background px-2 py-1 border border-border">Open Access — No Article Processing Charges</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif rounded-none px-6">
              Submission Guidelines
            </Button>
            <Button variant="outline" className="border-border hover:border-primary font-serif rounded-none px-6">
              Manuscript Template
            </Button>
          </div>
        </div>

        <div className="bg-background p-12 md:p-24 flex flex-col justify-center items-start border-l border-border">
          <span className="font-mono text-primary text-sm uppercase tracking-widest mb-4">For Reviewers</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join Our Review Panel</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            We welcome expert reviewers across all interdisciplinary domains to help maintain the rigorous standards of our publication.
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-serif rounded-none px-6 mt-auto">
            Reviewer Registration <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#home" className="font-serif text-3xl font-bold tracking-tight text-foreground block mb-4">
              JISCo
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Advancing interdisciplinary knowledge for sustainable communities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-6 text-lg">About</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About JISCo</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Editorial Board</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ethics Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Open Access Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-6 text-lg">For Authors</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Submit Manuscript</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Author Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Manuscript Template</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold mb-6 text-lg">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><a href="mailto:dimas.perceka@jisco.online" className="hover:text-primary transition-colors">editorial@jisco.or.id</a></li>
              <li>Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>ISSN: 2985-XXXX (Online)</span>
            <span className="hidden md:block">•</span>
            <span>DOI Prefix: 10.XXXXX</span>
            <span className="hidden md:block">•</span>
            <span>Publisher: JISCo Editorial Board</span>
            <span className="hidden md:block">•</span>
            <span>Biannual: June & December</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 JISCo — Journal on Interdisciplinary Science and Community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <FeaturedArticles />
        <ResearchDomains />
        <SubmissionProcess />
        <LatestIssues />
        <EditorialBoard />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
