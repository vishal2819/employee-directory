import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Help Center</h1>
        <p className="text-slate-500 mt-1">Get help and support</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Help center - find answers to common questions here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
