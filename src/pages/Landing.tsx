import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Target, Users, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yMCAwdjJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-fade-in">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Universal I CEO Framework v1.2</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Raghava v1.0
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            The Institution of Raghava
          </p>
          
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            A comprehensive executive operating system built for
            <span className="font-semibold text-[hsl(var(--gold))]"> Dr (Maj) Jai Prathap Reddy</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="bg-white text-[hsl(var(--navy))] hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                Access Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Executive Command Center</h2>
            <p className="text-xl text-muted-foreground">Built for leaders who demand excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-shadow animate-slide-up">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Secure authentication system with CEO, Director, Admin, and Staff roles. Your data, your control.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-xl gradient-ceo flex items-center justify-center mb-4 shadow-ceo">
                <Target className="h-6 w-6 text-[hsl(var(--navy))]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">CEO Dashboard</h3>
              <p className="text-muted-foreground">
                Exclusive executive insights with net worth tracking, OKRs, priority alerts, and AI-powered notes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Contacts, tasks, messages, and reviews. Everything your organization needs in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 The Institution of Raghava. Universal I CEO Framework v1.2
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
