import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { MoreVertical, Calendar } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem 
} from '../ui/dropdown-menu';

// Add TypeScript interfaces
interface FollowUp {
  id: string;
  priority: string;
  description: string;
  dueDate: string;
  case: {
    id: string;
    caseNumber: string;
  };
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface FollowUpCardProps {
  followUp: FollowUp;
  onReassign: (followUpId: string) => void;
  onStatusChange: (followUpId: string, status: string) => void;
}

export const FollowUpCard = ({ followUp, onReassign, onStatusChange }: FollowUpCardProps) => {
  const [isReassigning, setIsReassigning] = useState(false);
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    const colors = {
      URGENT: 'text-red-600 bg-red-50',
      DUE: 'text-yellow-600 bg-yellow-50',
      NORMAL: 'text-blue-600 bg-blue-50'
    };
    return colors[priority] || 'text-gray-600 bg-gray-50';
  };

  const handleReassign = async (userId) => {
    try {
      await client.graphql({
        query: updateFollowUpMutation,
        variables: {
          input: {
            id: followUp.id,
            assignedToId: userId,
            previouslyAssignedToIds: [...followUp.previouslyAssignedTo, followUp.assignedTo.id]
          }
        }
      });
      onReassign();
    } catch (error) {
      console.error('Error reassigning follow-up:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(followUp.priority)}`}>
              {followUp.priority}
            </span>
            <button
              onClick={() => navigate(`/cases/${followUp.case.id}`)}
              className="text-blue-600 hover:underline font-medium"
            >
              Case #{followUp.case.caseNumber}
            </button>
          </div>
          
          <p className="mt-2 text-gray-700 dark:text-gray-300">{followUp.description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar 
                src={followUp.assignedTo.avatar} 
                alt={followUp.assignedTo.name}
                className="h-6 w-6"
              />
              <span className="text-sm text-gray-500">
                {followUp.assignedTo.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {new Date(followUp.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setIsReassigning(true)}>
              Reassign
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onStatusChange(followUp.id, 'COMPLETED')}>
              Mark as Complete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};