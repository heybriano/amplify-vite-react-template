// src/components/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { getDashboardStats, listCases } from '../graphql/queries';

// Create the client for API calls
const client = generateClient();

// Define TypeScript interfaces for our data
interface DashboardStats {
  totalCases: number;
  openCases: number;
  overdueFollowUps: number;
  completedToday: number;
}

interface RecentCase {
  id: string;
  caseNumber: string;
  caseType: string;
  status: string;
  employee: {
    firstName: string;
    lastName: string;
  };
}

interface ListCasesResponse {
  listCases: {
    items: RecentCase[];
    nextToken: string | null;
  };
}

interface DashboardStatsResponse {
  getDashboardStats: DashboardStats;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    openCases: 0,
    overdueFollowUps: 0,
    completedToday: 0
  });
  const [recentCases, setRecentCases] = useState<RecentCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch cases
      const casesResult = (await client.graphql<ListCasesResponse>({
        query: listCases,
        variables: {
          limit: 5,
          sort: { field: 'createdAt', direction: 'DESC' }
        }
      })) as GraphQLResult<ListCasesResponse>;

      if (casesResult.data) {
        setRecentCases(casesResult.data.listCases.items);
      }
      
      // Fetch dashboard statistics
      const statsResult = (await client.graphql<DashboardStatsResponse>({
        query: getDashboardStats
      })) as GraphQLResult<DashboardStatsResponse>;
      
      if (statsResult.data) {
        setStats(statsResult.data.getDashboardStats);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/cases/new">
          <Button>New Case</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue Follow-ups</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overdueFollowUps}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedToday}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {recentCases.map((case_) => (
              <div key={case_.id} className="py-3">
                <Link 
                  to={`/cases/${case_.id}`}
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
                >
                  <div>
                    <p className="font-medium">Case #{case_.caseNumber}</p>
                    <p className="text-sm text-gray-500">
                      {case_.employee.firstName} {case_.employee.lastName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">{case_.caseType}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${case_.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        case_.status === 'DENIED' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'}`}
                    >
                      {case_.status}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;