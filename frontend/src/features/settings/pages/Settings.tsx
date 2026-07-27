import { PageLayout } from '@components/layout/PageLayout';

export default function Settings() {
  return (
    <PageLayout title="Settings">
      <div className="card">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[11px] text-[#1A1A2E]">Plant Name</span>
            <span className="text-[11px] text-[#6B7280]">Plant A</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[11px] text-[#1A1A2E]">Shift Configuration</span>
            <span className="text-[11px] text-[#6B7280]">3 Shifts</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
            <span className="text-[11px] text-[#1A1A2E]">Notification Settings</span>
            <span className="text-[11px] text-[#6B7280]">Enabled</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}