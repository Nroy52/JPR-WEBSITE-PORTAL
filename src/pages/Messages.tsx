import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Send, Link2, Users } from 'lucide-react';
import { MessageThread, Message, SEED_USERS } from '@/lib/seed';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Messages = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load threads
  useEffect(() => {
    const stored = localStorage.getItem('raghava:messages');
    if (stored) {
      setThreads(JSON.parse(stored));
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThread?.messages]);

  // Filter threads based on role
  const getVisibleThreads = () => {
    if (!user) return [];
    
    return threads.filter(thread => {
      if (user.role === 'CEO' || user.role === 'Admin') {
        return true; // See all threads
      }
      
      // Others only see threads they participate in
      return thread.participantIds.includes(user.id);
    });
  };

  const visibleThreads = getVisibleThreads();

  const handleCreateThread = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const participantIds = SEED_USERS
      .filter(u => formData.get(`participant-${u.id}`) === 'on')
      .map(u => u.id);

    if (participantIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one participant',
        variant: 'destructive'
      });
      return;
    }

    // Add creator to participants if not already there
    if (!participantIds.includes(user.id)) {
      participantIds.push(user.id);
    }

    const newThread: MessageThread = {
      id: `m${Date.now()}`,
      title: formData.get('title') as string,
      participantIds,
      linkedTaskId: formData.get('linkedTaskId') as string || undefined,
      ftuId: formData.get('ftuId') as string || undefined,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...threads, newThread];
    setThreads(updated);
    localStorage.setItem('raghava:messages', JSON.stringify(updated));
    setShowNewThread(false);
    setSelectedThread(newThread);
    toast({
      title: 'Success',
      description: 'Message thread created'
    });
  };

  const sendMessage = () => {
    if (!user || !selectedThread || !messageText.trim()) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      text: messageText,
      timestamp: new Date().toISOString()
    };

    const updated = threads.map(t =>
      t.id === selectedThread.id
        ? {
            ...t,
            messages: [...t.messages, newMessage],
            updatedAt: new Date().toISOString()
          }
        : t
    );

    setThreads(updated);
    localStorage.setItem('raghava:messages', JSON.stringify(updated));
    
    // Update selected thread
    const updatedThread = updated.find(t => t.id === selectedThread.id);
    if (updatedThread) {
      setSelectedThread(updatedThread);
    }

    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getUserName = (userId: string) => {
    const user = SEED_USERS.find(u => u.id === userId);
    return user?.name || 'Unknown';
  };

  const getParticipantNames = (participantIds: string[]) => {
    return participantIds.map(getUserName).join(', ');
  };

  // Extract @mentions
  const renderMessageWithMentions = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const parts = text.split(mentionRegex);
    
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // This is a mention
        return (
          <span key={i} className="text-primary font-medium">
            @{part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground text-lg">Team communication and collaboration</p>
          </div>
          <Dialog open={showNewThread} onOpenChange={setShowNewThread}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Message Thread</DialogTitle>
                <DialogDescription>Start a new conversation</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div>
                  <Label htmlFor="thread-title">Title *</Label>
                  <Input id="thread-title" name="title" required placeholder="Discussion topic..." />
                </div>
                <div>
                  <Label>Participants *</Label>
                  <div className="space-y-2 mt-2">
                    {SEED_USERS.filter(u => u.id !== user?.id).map(u => (
                      <div key={u.id} className="flex items-center space-x-2">
                        <Checkbox id={`participant-${u.id}`} name={`participant-${u.id}`} />
                        <label
                          htmlFor={`participant-${u.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {u.name} — {u.role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="thread-task">Link to Task (optional)</Label>
                  <Input id="thread-task" name="linkedTaskId" placeholder="Task ID" />
                </div>
                <div>
                  <Label htmlFor="thread-ftu">FTU Code (optional)</Label>
                  <Input id="thread-ftu" name="ftuId" placeholder="F1.T1" />
                </div>
                <Button type="submit" className="w-full">Create Thread</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Thread List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Threads
              </CardTitle>
              <CardDescription>{visibleThreads.length} conversation{visibleThreads.length !== 1 ? 's' : ''}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-1 p-4">
                  {visibleThreads.map(thread => (
                    <Card
                      key={thread.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedThread?.id === thread.id ? 'border-primary shadow-sm' : ''
                      }`}
                      onClick={() => setSelectedThread(thread)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">{thread.title}</h4>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="outline">{thread.participantIds.length} participants</Badge>
                          {thread.linkedTaskId && (
                            <Badge variant="secondary">
                              <Link2 className="h-3 w-3 mr-1" />
                              Task
                            </Badge>
                          )}
                          {thread.ftuId && <Badge variant="outline">{thread.ftuId}</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {thread.messages.length} message{thread.messages.length !== 1 ? 's' : ''}
                          {thread.messages.length > 0 && ` • Last: ${new Date(thread.updatedAt).toLocaleDateString()}`}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  {visibleThreads.length === 0 && (
                    <div className="text-center text-muted-foreground py-8 text-sm">
                      No threads yet. Create one to get started!
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message View */}
          <Card className="md:col-span-2">
            {selectedThread ? (
              <>
                <CardHeader>
                  <CardTitle>{selectedThread.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-sm">{getParticipantNames(selectedThread.participantIds)}</span>
                      {selectedThread.linkedTaskId && (
                        <Badge variant="secondary">
                          <Link2 className="h-3 w-3 mr-1" />
                          {selectedThread.linkedTaskId}
                        </Badge>
                      )}
                      {selectedThread.ftuId && <Badge variant="outline">{selectedThread.ftuId}</Badge>}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[450px] mb-4 pr-4">
                    <div className="space-y-4">
                      {selectedThread.messages.map(msg => {
                        const isOwnMessage = msg.senderId === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                              <div className="text-xs text-muted-foreground mb-1">
                                {getUserName(msg.senderId)} • {new Date(msg.timestamp).toLocaleString()}
                              </div>
                              <div
                                className={`p-3 rounded-lg ${
                                  isOwnMessage
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{renderMessageWithMentions(msg.text)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Tip: Use @name to mention someone
                      </span>
                      <Button onClick={sendMessage} disabled={!messageText.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="py-24 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a thread to view messages</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
