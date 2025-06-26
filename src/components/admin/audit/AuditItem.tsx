
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  FileText,
  Database,
  Eye,
  TrendingUp
} from 'lucide-react';

interface AuditItemProps {
  item: {
    id: string;
    category: 'security' | 'validation' | 'performance' | 'ui_ux' | 'architecture';
    title: string;
    description: string;
    status: 'fixed' | 'in_progress' | 'pending' | 'critical';
    priority: 'high' | 'medium' | 'low';
    fixedDate?: string;
    recommendations?: string[];
  };
}

export const AuditItem = ({ item }: AuditItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fixed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fixed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'validation':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'performance':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'ui_ux':
        return <Eye className="w-5 h-5 text-pink-500" />;
      case 'architecture':
        return <Database className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {getCategoryIcon(item.category)}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold">{item.title}</h3>
                {getStatusIcon(item.status)}
                <Badge className={getStatusColor(item.status)}>
                  {item.status === 'fixed' ? 'Corrigé' :
                   item.status === 'in_progress' ? 'En cours' :
                   item.status === 'pending' ? 'En attente' : 'Critique'}
                </Badge>
                <Badge variant="outline">
                  {item.priority === 'high' ? 'Haute' :
                   item.priority === 'medium' ? 'Moyenne' : 'Basse'}
                </Badge>
              </div>
              <p className="text-gray-600 mb-3">{item.description}</p>
              
              {item.fixedDate && (
                <p className="text-sm text-green-600 mb-2">
                  ✅ Corrigé le {item.fixedDate}
                </p>
              )}
              
              {item.recommendations && item.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Recommandations/Actions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {item.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
