import { Lead } from "@/types/leads";
import { useLeadsData } from "@/hooks/useLeadsData";
import { useSessionData } from "@/hooks/useSessionData";
import { Button } from "@/components/ui/button";
import { LeadsList } from "./filters/LeadsList";
import { ExportTabContent } from "./filters/ExportTabContent";
import { LeadCountSlider } from "./filters/LeadCountSlider";
import { SearchInput } from "./filters/SearchInput";
import { useEffect, useState } from "react";

export function LeadsTable() {
  const session = useSessionData();
  const leads = useLeadsData(session.data);
  const [exportLeads, setExportLeads] = useState<any[]>([]);
  const [leadCount, setLeadCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(lead =>
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToExport = (lead: any) => {
    setExportLeads(prev => [...prev, lead]);
  };

  const handleRemoveFromExport = (leadId: number) => {
    setExportLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  useEffect(() => {
    if (exportLeads.length > leadCount) {
      setExportLeads(prev => prev.slice(0, leadCount));
    }
  }, [leadCount]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-primary-light">Leads</h2>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <LeadCountSlider value={leadCount} onChange={setLeadCount} />
      <LeadsList leads={filteredLeads} onAddToAnalytics={handleAddToExport} />
      <ExportTabContent exportLeads={exportLeads} onRemoveFromExport={handleRemoveFromExport} />
    </div>
  );
}
