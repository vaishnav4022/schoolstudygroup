import { useState } from 'react';
import { useListGroupsQuery } from '../redux/api/groupsApi';
import { Card, Input, Button, Skeleton, EmptyState, Pagination, Avatar, Badge } from '../components';

const GroupDiscoveryPage = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useListGroupsQuery(filters);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, subject: searchTerm, page: 1 });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handlePageChange = (page) => setFilters({ ...filters, page });

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ page: 1, limit: 10 });
  };

  if (error) {
    return (
      <div className="p-6">
        <EmptyState icon="⚠️" title="Failed to load groups" message="Please try again." buttonText="Retry" onButtonClick={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Discover Study Groups</h1>
        <p className="mt-1 text-sm text-secondary-500">Find and join the perfect study group for you.</p>
      </div>

      {/* Filters */}
      <Card padding="p-5" className="mb-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Search by subject"
              placeholder="e.g., Data Structures"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              label="Semester"
              type="select"
              options={['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']}
              onChange={(e) => handleFilterChange('semester', e.target.value)}
            />
            <Input
              label="Meeting Mode"
              type="select"
              options={['Online', 'Offline', 'Hybrid']}
              onChange={(e) => handleFilterChange('meetingMode', e.target.value)}
            />
            <div className="flex items-end gap-2">
              <Button type="submit" className="flex-1">Search</Button>
              <Button type="button" variant="outline" onClick={clearFilters}>Clear</Button>
            </div>
          </div>
        </form>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} padding="p-5"><Skeleton count={2} /></Card>
          ))}
        </div>
      ) : data?.groups?.length ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-secondary-500">
              Showing <span className="font-medium text-secondary-900">{data.groups.length}</span> of{' '}
              <span className="font-medium text-secondary-900">{data.total}</span> groups
            </p>
          </div>

          <div className="space-y-3">
            {data.groups.map((group) => (
              <Card key={group._id} padding="p-5" className="hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar
                    initials={group.groupName?.slice(0, 2)}
                    size="lg"
                    className="flex-shrink-0 mt-0.5"
                  />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-secondary-900 truncate">{group.groupName}</h3>
                        <p className="mt-1 text-sm text-secondary-500 line-clamp-2">{group.description}</p>
                      </div>
                      <Button size="sm" className="flex-shrink-0">Join Group</Button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="primary">{group.subject}</Badge>
                      <Badge variant="secondary">{group.meetingMode}</Badge>
                      {group.semester && <Badge variant="neutral">Sem {group.semester}</Badge>}
                      <span className="flex items-center gap-1 text-xs text-secondary-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {group.currentMembers}/{group.maxMembers} members
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {data.total > filters.limit && (
            <div className="mt-8">
              <Pagination
                currentPage={filters.page}
                totalPages={Math.ceil(data.total / filters.limit)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon="🔍"
          title="No groups found"
          message="Try adjusting your filters or search for a different subject."
          buttonText="Clear Filters"
          onButtonClick={clearFilters}
        />
      )}
    </div>
  );
};

export default GroupDiscoveryPage;
