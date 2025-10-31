import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Geometric pattern background on the LEFT side */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--gold) / 0.1) 0px, hsl(var(--gold) / 0.1) 2px, transparent 2px, transparent 10px)`
        }} />
      </div>

      {/* Gradient overlay from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/90 to-black" />

      {/* Content - Centered */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">

          {/* Golden Crown Icon with Golden Glow in Center */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
                <Crown 
                  className="w-32 h-32 lg:w-40 lg:h-40 text-gold" 
                  strokeWidth={1.5}
                  style={{ filter: 'drop-shadow(0 0 40px hsl(var(--gold) / 0.6))' }}
                />
              </div>
              {/* Golden glow background */}
              <div className="absolute inset-0 blur-3xl opacity-40" 
                  style={{ background: 'radial-gradient(circle, hsl(var(--gold) / 0.8) 0%, transparent 70%)' }} 
              />
            </div>
          </div>

          {/* Name and Bio - Centered */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground gold-glow">
              Jai Prathap Reddy
            </h1>

            <p className="text-xl lg:text-2xl text-gold font-semibold">
              Dentist, Army Major (retd), Visionary CEO,<br />
              Vishwa Guru in Becoming
            </p>

            {/* Awards */}
            <div className="pt-2 pb-2">
              <p className="text-base lg:text-lg text-gold/80">
                Two times Global Excellence Award<br />
                by the UK Parliament
              </p>
            </div>

            {/* Quote */}
            <blockquote className="text-xl lg:text-2xl italic text-gold font-semibold pt-6 border-t border-gold/30 max-w-2xl mx-auto">
              "Crowned by Dharma. Guided by Vision.<br />
              Rising as VishwaGuru."
            </blockquote>
          </div>

          {/* Buttons */}
          <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              className="gradient-ceo text-navy px-10 py-6 text-lg hover-lift shadow-lg"
            >
              Access Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button 
              onClick={() => navigate("/signup")}
              size="lg"
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold/10 px-10 py-6 text-lg hover-lift shadow-lg"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
