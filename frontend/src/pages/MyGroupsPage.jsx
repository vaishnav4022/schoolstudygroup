import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListGroupsQuery } from '../redux/api/groupsApi';
import { Card, Button, Skeleton, EmptyState, Badge, Avatar } from '../components';

const FILTERS = [
  { key: 'all', label: 'All Groups' },
  { key: 'admin', label: 'Administering' },
];

const MyGroupsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const { data, isLoading } = useListGroupsQuery({});

  const filteredGroups = data?.groups || [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height="h-10" width="w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} height="h-44" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Study Groups</h1>
          <p className="mt-1 text-sm text-secondary-500">Groups you've joined or manage.</p>
        </div>
        <Button onClick={() => navigate('/discover')} size="sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Join New Group
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-1 rounded-xl border border-secondary-200 bg-secondary-50 p-1 w-fit">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
              filter === f.key
                ? 'bg-white text-secondary-900 shadow-sm'
                : 'text-secondary-500 hover:text-secondary-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredGroups.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <div
              key={group._id}
              onClick={() => navigate(`/groups/${group._id}`)}
              className="group cursor-pointer rounded-xl border border-secondary-100 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              {/* Card header */}
              <div className="flex items-start gap-3">
                <Avatar initials={group.groupName?.slice(0, 2)} size="md" className="flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {group.groupName}
                  </h3>
                  <p className="text-xs text-secondary-400 mt-0.5">{group.subject}</p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-secondary-500 line-clamp-2 leading-relaxed">
                {group.description || 'No description provided.'}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="primary" size="sm">{group.subject}</Badge>
                <Badge variant={group.meetingMode === 'Online' ? 'success' : 'neutral'} size="sm">
                  {group.meetingMode}
                </Badge>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-secondary-100 pt-3">
                <span className="flex items-center gap-1 text-xs text-secondary-400">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {group.currentMembers}/{group.maxMembers}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/groups/${group._id}`); }}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Open Group →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📚"
          title="No groups yet"
          message="Join a study group to start collaborating with other students."
          buttonText="Discover Groups"
          onButtonClick={() => navigate('/discover')}
        />
      )}
    </div>
  );
};

export default MyGroupsPage;
