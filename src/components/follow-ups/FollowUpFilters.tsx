// src/components/follow-ups/FollowUpFilters.tsx
import { useState } from 'react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Calendar, Search } from 'lucide-react';

type Priority = 'all' | 'URGENT' | 'DUE' | 'NORMAL';
type Status = 'all' | 'PAST_DUE' | 'DUE_TODAY' | 'UPCOMING' | 'COMPLETED';
type DateRange = 'all' | 'today' | 'week' | 'month';

interface FilterOptions {
  priority: Priority;
  status: Status;
  dateRange: DateRange;
  search: string;
}

interface FollowUpFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const FollowUpFilters = ({ onFilterChange }: FollowUpFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priority: 'all',
    status: 'all',
    dateRange: 'all',
    search: ''
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value } as FilterOptions;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full"
            aria-label="Priority filter"
          >
            <option value="all">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="DUE">Due</option>
            <option value="NORMAL">Normal</option>
          </Select>
        </div>

        <div className="relative">
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full"
            aria-label="Status filter"
          >
            <option value="all">All Status</option>
            <option value="PAST_DUE">Past Due</option>
            <option value="DUE_TODAY">Due Today</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
          </Select>
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="Search follow-ups..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10"
            aria-label="Search follow-ups"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </span>
        </div>

        <div className="relative">
          <Select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full pl-10"
            aria-label="Date range filter"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </Select>
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Calendar className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};