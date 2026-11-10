import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface EmptyStateProps {
  type: 'pending' | 'completed';
}

export function EmptyState({ type }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 text-lg tracking-wide">
        {type === 'pending' 
          ? 'Nenhuma tarefa pendente! 🎉'
          : 'Nenhuma tarefa concluída ainda'
        }
      </p>
    </div>
  );
}