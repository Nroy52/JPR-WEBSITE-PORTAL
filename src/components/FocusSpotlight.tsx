import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Copy, ExternalLink } from 'lucide-react';
import { FTU_FRAMEWORK, generateTopicScore, generateSparklineData } from '@/lib/seed';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface TopicWithScore {
  focusCode: string;
  focusTitle: string;
  topicCode: string;
  topicTitle: string;
  ftuCode: string;
  score: number;
  sparkline: number[];
  deltaWoW: number;
}

export function FocusSpotlight() {
  const [allTopics, setAllTopics] = useState<TopicWithScore[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate all topics with scores and momentum
    const topics: TopicWithScore[] = [];
    
    FTU_FRAMEWORK.forEach(focus => {
      focus.topics.forEach(topic => {
        const ftuCode = `${focus.code}.${topic.code}`;
        const sparkline = generateSparklineData(ftuCode);
        const currentScore = sparkline[sparkline.length - 1];
        const prevScore = sparkline[sparkline.length - 2];
        const deltaWoW = currentScore - prevScore;
        
        topics.push({
          focusCode: focus.code,
          focusTitle: focus.title,
          topicCode: topic.code,
          topicTitle: topic.title,
          ftuCode,
          score: currentScore,
          sparkline,
          deltaWoW,
        });
      });
    });

    // Sort by momentum (deltaWoW descending), then by focus index
    topics.sort((a, b) => {
      if (Math.abs(b.deltaWoW - a.deltaWoW) < 0.01) {
        return a.ftuCode.localeCompare(b.ftuCode);
      }
      return b.deltaWoW - a.deltaWoW;
    });

    setAllTopics(topics);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond if card is focused or a descendant is focused
      if (!cardRef.current?.contains(document.activeElement)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : allTopics.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex(prev => (prev < allTopics.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpenExplorer();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleCopyId();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allTopics, currentIndex]);

  if (allTopics.length === 0) return null;

  const current = allTopics[currentIndex];

  const handleCopyId = () => {
    navigator.clipboard.writeText(current.ftuCode);
    toast.success(`Copied ${current.ftuCode} to clipboard`);
  };

  const handleOpenExplorer = () => {
    // Navigate to explorer with FTU deep link
    navigate(`/explorer?ftu=${current.ftuCode}`);
  };

  return (
    <Card
      ref={cardRef}
      className="shadow-lg border-2 border-primary/20 focus-within:ring-2 focus-within:ring-primary"
      role="group"
      tabIndex={0}
      aria-label="Focus Spotlight - Use arrow keys to navigate, Enter to open, C to copy"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Focus Spotlight
              <Badge variant="outline" className="text-xs">
                {currentIndex + 1} / {allTopics.length}
              </Badge>
            </CardTitle>
            <CardDescription>Highest momentum topic this week</CardDescription>
          </div>
          <Badge className="gradient-ceo text-primary px-3 py-1">
            {current.focusCode} • {current.focusTitle}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic Info */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-lg">{current.topicTitle}</h4>
              <p className="text-sm text-muted-foreground">{current.topicCode}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{current.score}</div>
              <div className={`text-sm flex items-center gap-1 ${current.deltaWoW >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {current.deltaWoW >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {current.deltaWoW >= 0 ? '+' : ''}{current.deltaWoW.toFixed(1)} WoW
              </div>
            </div>
          </div>

          {/* Sparkline */}
          <div className="mt-3">
            <svg width="100%" height="40" className="overflow-visible">
              <defs>
                <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {(() => {
                const points = current.sparkline;
                const max = Math.max(...points);
                const min = Math.min(...points);
                const range = max - min || 1;
                const width = 100;
                const height = 40;
                const step = width / (points.length - 1);

                const pathData = points.map((val, i) => {
                  const x = i * step;
                  const y = height - ((val - min) / range) * height;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ');

                const areaData = `${pathData} L ${width} ${height} L 0 ${height} Z`;

                return (
                  <>
                    <path
                      d={areaData}
                      fill="url(#sparkline-gradient)"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d={pathData}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Data points */}
                    {points.map((val, i) => {
                      const x = (i * step) + '%';
                      const y = ((height - ((val - min) / range) * height) / height) * 100 + '%';
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="2"
                          fill="hsl(var(--primary))"
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>8 weeks ago</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleOpenExplorer} className="flex-1" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Explorer
          </Button>
          <Button onClick={handleCopyId} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </Button>
        </div>

        {/* Keyboard Hints */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
          <strong>Keyboard:</strong> ← → Navigate • Enter/Space Open • C Copy
        </div>
      </CardContent>
    </Card>
  );
}
