import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import * as powerbi from 'powerbi-client';

const MyPowerBIReport = () => {
  useEffect(() => {
    // Embed Power BI report when component mounts
    const embedConfig = {
      type: 'report',
      id: 'https://app.powerbi.com/reportEmbed?reportId=ac7f9422-2d8c-4b74-999e-3cfe63cef6ff&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7',
      embedUrl: 'YOUR_REPORT_EMBED_URL',
      accessToken: 'YOUR_ACCESS_TOKEN',
      settings: {
        panes: {
          filters: {
            visible: true,
          },
        },
      },
    };

    const reportContainer = document.getElementById('reportContainer');
    const report = powerbi.embed(reportContainer, embedConfig);
  }, []);

  const handleGenerateDailyReport = () => {
    // Navigate to Power BI report
    window.location.href = 'URL_TO_YOUR_POWER_BI_REPORT';
  };

  return (
    <div className="container mt-5">
      <div className="mb-5">
        <Button
          variant="primary fw-bold"
          size="lg"
          style={{ width: "320px", height: "100px" }}
          onClick={handleGenerateDailyReport}
        >
          Generate Daily Report
        </Button>
      </div>
      <div id="reportContainer" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};

export default MyPowerBIReport;
