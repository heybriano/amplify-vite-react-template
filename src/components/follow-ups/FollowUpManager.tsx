// src/components/follow-ups/FollowUpManager.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { FollowUpList } from '/Users/brianonufrejow/Documents/case-management-gen2/src/components/follow-ups/FollowUpList.tsx';
import { FollowUpFilters } from './FollowUpFilters';

const client = generateClient();

interface FollowUp {
  id: string;
  description: string;
  dueDate: string;
  priority: 'URGENT' | 'DUE' | 'NORMAL';
  status: 'PAST_DUE' | 'DUE_TODAY' | 'UPCOMING' | 'COMPLETED';
  completed: boolean;
  case: {
    id: string;
    caseNumber: string;
    client: {
      id: string;
      name: string;
    };
  };
  assignedTo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const FollowUpManager = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    dateRange: 'all',
    search: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowUps();
  }, [filters]);

  const fetchFollowUps = async () => {
    try {
      const response = await client.graphql({
        query: listFollowUps,
        variables: {
          filter: {
            ...buildFilterCriteria(filters)
          }
        }
      });
      
      setFollowUps(response.data.listFollowUps.items);
    } catch (error) {
      console.error('Error fetching follow-ups:', error);
    } finally {
      setLoading(false);
    }
  };

  const buildFilterCriteria = (filters: any) => {
    const criteria: any = {};
    
    if (filters.priority !== 'all') {
      criteria.priority = { eq: filters.priority };
    }
    if (filters.status !== 'all') {
      criteria.status = { eq: filters.status };
    }
    // Add more filter criteria as needed
    
    return criteria;
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleCaseClick = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading follow-ups...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Follow-ups</h1>
      </div>
      
      <FollowUpFilters 
        currentFilters= {filters}
        onFilterChange={handleFilterChange}
      />
      
      <FollowUpList 
        followUps={followUps}
        onCaseClick={handleCaseClick}
      />
    </div>
  );
};

export default FollowUpManager;