import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Messages = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground text-lg">Team communication and collaboration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Messages</CardTitle>
            <CardDescription>Lightweight messaging system for your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-12">
              Messaging feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
