// src/components/follow-ups/ReassignModal.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  followUp: {
    case: {
      client: {
        id: string;
      };
    };
  };
  onReassign: (userId: string) => Promise<void>;
}

export const ReassignModal = ({ isOpen, onClose, followUp, onReassign }: ReassignModalProps) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: {
          filter: {
            clientId: { eq: followUp.case.client.id }
          }
        }
      });
      setUsers(response.data.listUsers.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleReassign = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await onReassign(selectedUser.id);
      onClose();
    } catch (error) {
      console.error('Error reassigning:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reassign Follow-up</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center space-x-3 p-3 rounded-lg border 
                  ${selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <Avatar src={user.avatar} alt={user.firstName} />
                <div className="text-left">
                  <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleReassign} 
              disabled={!selectedUser || loading}
            >
              {loading ? 'Reassigning...' : 'Reassign'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};