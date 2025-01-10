// src/components/follow-ups/FollowUpList.tsx
import { useMemo } from 'react';
import { FollowUpCard } from './FollowUpCard';

interface FollowUp {
  id: string;
  description: string;
  dueDate: string;
  priority: 'URGENT' | 'DUE' | 'NORMAL';
  status: 'PAST_DUE' | 'DUE_TODAY' | 'UPCOMING' | 'COMPLETED';
  case: {
    id: string;
    caseNumber: string;
  };
  assignedTo: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface FollowUpListProps {
  followUps: FollowUp[];
  onCaseClick: (caseId: string) => void;
}

export const FollowUpList = ({ followUps, onCaseClick }: FollowUpListProps) => {
  const groupedFollowUps = useMemo(() => {
    const groups = {
      URGENT: [],
      DUE: [],
      NORMAL: [],
    };

    followUps.forEach(followUp => groups[followUp.priority].push(followUp));

    return groups;
  }, [followUps]);

  if (followUps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No follow-ups found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedFollowUps).map(([priority, items]) => (
        items.length > 0 && (
          <div key={priority} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">
              {priority}
              <span className="ml-2 text-sm text-gray-500">
                ({items.length})
              </span>
            </h2>
            <div className="space-y-2">
              {items.map(followUp => (
                <FollowUpCard 
                  key={followUp.id}
                  followUp={followUp}
                  onCaseClick={onCaseClick}
                />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};