import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGroupQuery } from '../redux/api/groupsApi';
import { useListResourcesQuery } from '../redux/api/resourcesApi';
import { useListSessionsQuery } from '../redux/api/sessionsApi';
import { Button, Skeleton, EmptyState, Badge, Avatar, Card } from '../components';

const TABS = ['Overview', 'Resources', 'Sessions', 'Discussions'];

const GroupDetailsPage = () => {
  const { id: groupId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const { data: group, isLoading: groupLoading } = useGetGroupQuery(groupId);
  const { data: resources, isLoading: resourcesLoading } = useListResourcesQuery(groupId);
  const { data: sessions, isLoading: sessionsLoading } = useListSessionsQuery(groupId);

  if (groupLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height="h-32" />
        <Skeleton height="h-10" />
        <Skeleton count={3} height="h-20" />
      </div>
    );
  }

  const g = group?.group || {};

  return (
    <div className="p-6 space-y-5">
      {/* Header card */}
      <Card padding="p-5">
        <div className="flex items-start gap-4">
          <Avatar initials={g.groupName?.slice(0, 2)} size="xl" className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl font-bold text-secondary-900">{g.groupName}</h1>
                <p className="mt-1 text-sm text-secondary-500 max-w-lg">{g.description}</p>
              </div>
              <Button size="sm">Join Group</Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="primary">{g.subject}</Badge>
              <Badge variant={g.meetingMode === 'Online' ? 'success' : 'secondary'}>{g.meetingMode}</Badge>
              <Badge variant="neutral">{g.currentMembers}/{g.maxMembers} Members</Badge>
              {g.status && (
                <Badge variant={g.status === 'active' ? 'success' : 'warning'} dot>
                  {g.status}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Tab bar */}
      <div className="flex gap-0.5 border-b border-secondary-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {/* ── Overview ── */}
        {activeTab === 'Overview' && (
          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Group Information" padding="p-5">
              <dl className="space-y-3">
                {[
                  { label: 'Semester', value: g.semester },
                  { label: 'Meeting Mode', value: g.meetingMode },
                  { label: 'Meeting Link', value: g.meetingLink || 'Not provided', mono: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 py-2 border-b border-secondary-50 last:border-0">
                    <dt className="text-xs font-medium text-secondary-500 uppercase tracking-wide mt-0.5">{row.label}</dt>
                    <dd className={`text-sm text-secondary-900 text-right ${row.mono ? 'font-mono text-xs' : ''}`}>
                      {row.value ?? 'N/A'}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card title="Members" padding="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                  <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">Group Admin</p>
                  <p className="text-xs text-secondary-500">{g.currentMembers} total member{g.currentMembers !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── Resources ── */}
        {activeTab === 'Resources' && (
          <div className="space-y-3">
            {resourcesLoading ? (
              <Skeleton count={3} height="h-16" />
            ) : resources?.resources?.length ? (
              resources.resources.map((resource) => (
                <Card key={resource._id} padding="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
                      <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900 truncate">{resource.title}</p>
                      <p className="text-xs text-secondary-500 truncate">{resource.description}</p>
                    </div>
                    <Button size="xs" variant="outline">Download</Button>
                  </div>
                </Card>
              ))
            ) : (
              <EmptyState icon="📁" title="No resources yet" message="No resources have been shared in this group." />
            )}
          </div>
        )}

        {/* ── Sessions ── */}
        {activeTab === 'Sessions' && (
          <div className="space-y-3">
            {sessionsLoading ? (
              <Skeleton count={3} height="h-16" />
            ) : sessions?.sessions?.length ? (
              sessions.sessions.map((session) => (
                <Card key={session._id} padding="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-violet-50">
                      <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-secondary-900">{session.topic}</p>
                      <p className="text-xs text-secondary-500">
                        {new Date(session.date).toLocaleDateString()} at {session.startTime}
                      </p>
                    </div>
                    <Button size="xs">Join</Button>
                  </div>
                </Card>
              ))
            ) : (
              <EmptyState icon="📅" title="No sessions scheduled" message="No sessions have been scheduled yet." />
            )}
          </div>
        )}

        {/* ── Discussions ── */}
        {activeTab === 'Discussions' && (
          <EmptyState icon="💬" title="Discussions" message="Discussion board coming soon." />
        )}
      </div>
    </div>
  );
};

export default GroupDetailsPage;
