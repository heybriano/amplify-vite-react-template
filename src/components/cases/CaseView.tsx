// src/components/cases/CaseView.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Button } from '/Users/brianonufrejow/Documents/case-management-gen2/src/components/ui/button.tsx';

const client = generateClient();

export const CaseView = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseData();
  }, [caseId]);

  const fetchCaseData = async () => {
    try {
      const response = await client.graphql({
        query: getCase,
        variables: { id: caseId }
      });
      setCaseData(response.data.getCase);
    } catch (error) {
      console.error('Error fetching case:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Case #{caseData.caseNumber}
        </h1>
        <Button variant="outline">
          Back to Follow-ups
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Case Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-500">Type</dt>
              <dd className="mt-1 text-sm">{caseData.caseType}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Status</dt>
              <dd className="mt-1 text-sm">{caseData.status}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Client</dt>
              <dd className="mt-1 text-sm">{caseData.client.name}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Follow-ups</h2>
          {caseData.followUps.items.map((followUp) => (
            <div key={followUp.id} className="border-b py-3 last:border-0">
              <p className="text-sm">{followUp.description}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>Due: {new Date(followUp.dueDate).toLocaleDateString()}</span>
                <span>{followUp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getCase = /* GraphQL */ `
  query GetCase($id: ID!) {
    getCase(id: $id) {
      id
      caseNumber
      caseType
      status
      client {
        id
        name
      }
      followUps {
        items {
          id
          description
          dueDate
          status
          priority
        }
      }
      createdAt
      updatedAt
    }
  }
`;