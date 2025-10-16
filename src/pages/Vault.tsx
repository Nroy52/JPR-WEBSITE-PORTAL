import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Vault = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Vault</h1>
          </div>
          <p className="text-muted-foreground text-lg">Secure document and credential storage</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Secure Vault</CardTitle>
            <CardDescription>Store sensitive documents and credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-12">
              Vault feature coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vault;
