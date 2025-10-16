import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Tasks = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground text-lg">Kanban board and task management</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task Board</CardTitle>
            <CardDescription>Manage tasks across Backlog, Doing, Blocked, and Done</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-12">
              Task management feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;
