import { Lead } from "@/types/leads";
import { useLeadsData } from "@/hooks/useLeadsData";
import { useSessionData } from "@/hooks/useSessionData";
import { LeadsList } from "./filters/LeadsList";
import { ExportTabContent } from "./filters/ExportTabContent";
import { LeadCountSlider } from "./filters/LeadCountSlider";
import { SearchInput } from "./filters/SearchInput";
import { useEffect, useState } from "react";

export function LeadsTable() {
  const session = useSessionData();
  const leads = useLeadsData(session.data);
  const [exportLeads, setExportLeads] = useState<Lead[]>([]);
  const [leadCount, setLeadCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(lead =>
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToExport = (lead: Lead) => {
    setExportLeads(prev => [...prev, lead]);
  };

  const handleRemoveFromExport = (leadId: string) => {
    setExportLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  useEffect(() => {
    if (exportLeads.length > leadCount) {
      setExportLeads(prev => prev.slice(0, leadCount));
    }
  }, [leadCount]);

  return (
    <div className="p-4 bg-secondary-dark/80 rounded-lg border border-primary-light/20">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
        Leads
      </h2>
      <div className="space-y-4 text-primary-light">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <LeadCountSlider value={leadCount} onChange={setLeadCount} />
        <LeadsList leads={filteredLeads} onAddToAnalytics={handleAddToExport} />
        <ExportTabContent exportLeads={exportLeads} onRemoveFromExport={handleRemoveFromExport} />
      </div>
    </div>
  );
}