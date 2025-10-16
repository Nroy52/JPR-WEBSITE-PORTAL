import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';

const Contacts = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contacts</h1>
          <p className="text-muted-foreground text-lg">Manage your organization directory</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Contact Directory</CardTitle>
                <CardDescription>Rolodex-style contact management</CardDescription>
              </div>
              <Button className="gradient-primary text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10" />
              </div>
            </div>
            <p className="text-center text-muted-foreground py-12">
              Contact management feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;
