
import { useState, useEffect } from 'react';
import { Music, Search, Users, Star, MusicIcon, Guitar, Mic, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedContainer } from '@/components/ui-custom/AnimatedContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

export const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: 'Find Missing Band Members',
      description: 'Find the perfect musician to complete your band based on instrument, skill level, and style.',
      icon: Search,
      delay: '0s',
    },
    {
      title: 'Form a New Band',
      description: 'Create your band profile and connect with musicians who share your vision.',
      icon: Users,
      delay: '0.1s',
    },
    {
      title: 'Filter by Location & Skill',
      description: 'Search for musicians near you with the experience level you need.',
      icon: MapPin,
      delay: '0.2s',
    },
    {
      title: 'Rate Musicians',
      description: 'Review and rate musicians based on their performance and reliability.',
      icon: Star,
      delay: '0.3s',
    },
  ];

  const testimonials = [
    {
      quote: "SocialBand helped me find a drummer within days after our previous one left. The filtering system made it easy to find someone with the right experience.",
      name: "Alex Chen",
      role: "Lead Guitarist, The Resonants",
      delay: '0s',
    },
    {
      quote: "I moved to a new city and was looking to join a band. Through SocialBand, I found a group that perfectly matched my jazz background and ambitions.",
      name: "Mia Rodriguez",
      role: "Vocalist & Keyboardist",
      delay: '0.1s',
    },
    {
      quote: "As someone looking to form my first band, the platform made it incredibly easy to connect with like-minded musicians in my area.",
      name: "Jason Porter",
      role: "Band Founder, Electric Pulse",
      delay: '0.2s',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(139,116,248,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 -z-10 opacity-30 mix-blend-soft-light bg-noise"></div>
      
      {/* Navbar */}
      <Navbar transparent />
      
      {/* Hero section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
              <AnimatedContainer 
                animation={isLoaded ? "slide-up" : "none"}
                className="space-y-3"
              >
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-music-100 text-music-700">
                  <MusicIcon className="mr-1 h-3 w-3" />
                  <span>Connect with fellow musicians</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-pretty">
                  Find Your Perfect <span className="text-music-600">Band Members</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  SocialBand connects musicians and bands, making it easy to find the perfect match for your musical journey.
                </p>
              </AnimatedContainer>
              
              <AnimatedContainer 
                animation={isLoaded ? "slide-up" : "none"}
                delay="0.1s"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  variant="music" 
                  size="lg" 
                  href="/signup"
                  className="text-base"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  href="/how-it-works"
                  className="text-base"
                >
                  How It Works
                </Button>
              </AnimatedContainer>
              
              <AnimatedContainer 
                animation={isLoaded ? "fade-in" : "none"}
                delay="0.2s"
              >
                <div className="pt-4 flex items-center space-x-6 text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center"
                      >
                        <span className="text-xs">{String.fromCharCode(65 + i)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">2,000+</span> musicians have already joined
                  </div>
                </div>
              </AnimatedContainer>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <AnimatedContainer 
                animation={isLoaded ? "scale-in" : "none"}
                delay="0.2s"
                className="relative z-10"
              >
                <div className="aspect-square max-w-lg mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-radial from-music-200/30 to-transparent rounded-full blur-2xl"></div>
                  
                  {/* Animated musical icons */}
                  <div className="absolute h-10 w-10 top-10 right-20 text-music-600 animate-wave-1">
                    <Guitar />
                  </div>
                  <div className="absolute h-8 w-8 bottom-20 left-10 text-music-500 animate-wave-2">
                    <Mic />
                  </div>
                  <div className="absolute h-12 w-12 top-1/3 left-1/4 text-music-700 animate-wave-3">
                    <Music />
                  </div>
                  
                  {/* Main image placeholder - here we'd use a real image in production */}
                  <div className="absolute inset-10 rounded-full bg-gradient-to-br from-music-200 to-music-400 shadow-xl flex items-center justify-center">
                    <Music className="h-32 w-32 text-white" />
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedContainer 
              animation={isLoaded ? "slide-up" : "none"}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Everything You Need to Connect
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform provides all the tools you need to form the perfect band or find your musical home.
              </p>
            </AnimatedContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedContainer 
                key={index}
                animation={isLoaded ? "scale-in" : "none"}
                delay={feature.delay}
              >
                <Card animateIn={false} className="h-full">
                  <CardHeader>
                    <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center bg-music-100 text-music-600 mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedContainer 
              animation={isLoaded ? "slide-up" : "none"}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from musicians who found their perfect match on SocialBand.
              </p>
            </AnimatedContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedContainer 
                key={index}
                animation={isLoaded ? "fade-in" : "none"}
                delay={testimonial.delay}
              >
                <Card variant="glass" animateIn={false} className="h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-music-500">
                      <svg width="45" height="36" className="fill-current">
                        <path d="M13.415.43c-2.523 0-4.75 1.173-6.682 3.52C4.8 6.296 3.833 9.18 3.833 12.6c0 3.9.583 7.355 1.75 10.365 1.166 3.01 2.858 5.604 5.076 7.784 2.216 2.18 4.71 3.88 7.48 5.097 2.77 1.218 5.95 1.827 9.536 1.827v-8.262c-2.77 0-4.977-.442-6.62-1.324-1.647-.883-2.86-2.09-3.642-3.618-.782-1.53-1.173-3.208-1.173-5.037 0-.883.22-1.604.66-2.162.44-.558 1.104-.837 1.993-.837.78 0 1.604.215 2.472.646.868.43 1.827.646 2.88.646 1.53 0 2.703-.418 3.516-1.254.81-.836 1.215-1.993 1.215-3.473 0-1.67-.469-3.056-1.408-4.157-.939-1.1-2.36-1.65-4.266-1.65Zm21.833 0c-2.523 0-4.75 1.173-6.682 3.52-1.933 2.345-2.9 5.23-2.9 8.648 0 3.9.583 7.355 1.75 10.365 1.166 3.01 2.858 5.604 5.075 7.784 2.218 2.18 4.712 3.88 7.48 5.097 2.77 1.218 5.95 1.827 9.538 1.827v-8.262c-2.77 0-4.977-.442-6.62-1.324-1.647-.883-2.86-2.09-3.642-3.618-.783-1.53-1.174-3.208-1.174-5.037 0-.883.22-1.604.66-2.162.44-.558 1.104-.837 1.993-.837.78 0 1.604.215 2.472.646.868.43 1.827.646 2.88.646 1.53 0 2.702-.418 3.516-1.254.81-.836 1.215-1.993 1.215-3.473 0-1.67-.47-3.056-1.41-4.157-.938-1.1-2.358-1.65-4.264-1.65Z"/>
                      </svg>
                    </div>
                    <p className="mb-6 text-balance">
                      {testimonial.quote}
                    </p>
                    <div className="pt-4 border-t border-border/40">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedContainer 
            animation={isLoaded ? "scale-in" : "none"}
            className="relative"
          >
            <Card variant="glass" className="overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-music-600/20 to-music-900/20 mix-blend-multiply"></div>
              <div className="relative p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Find Your Musical Match?
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Join SocialBand today and connect with musicians who share your passion and vision.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    variant="music" 
                    size="lg" 
                    href="/signup"
                    className="text-base"
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    href="/find-musicians"
                    className="text-base bg-white/80 hover:bg-white"
                  >
                    Explore Musicians
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xl font-display font-bold">
                <Music className="h-6 w-6 text-music-600" />
                <span>SocialBand</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting musicians and bands since 2023
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Find Musicians</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Form a Band</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Musician Profiles</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Rating System</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 SocialBand. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
