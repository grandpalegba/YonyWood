const fs = require('fs');
let content = fs.readFileSync('src/services/api.ts', 'utf-8');

content = content.replace('export const apiService = new YonywoodApiService();', '');

// Remove the last closing brace
const lastBraceIndex = content.lastIndexOf('}');
if (lastBraceIndex !== -1) {
    content = content.substring(0, lastBraceIndex) + content.substring(lastBraceIndex + 1);
}

const newMethods = `
  // 7. REPORTS
  async reportContent(targetId: string, targetType: 'duo' | 'series', reason: string, details?: string) {
    const payload = {
      reason,
      details,
      ...(targetType === 'duo' ? { duoId: targetId } : { seriesId: targetId })
    };
    return await this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // 8. ADMIN DASHBOARD
  async getAdminSeries() {
    return await this.request('/admin/series');
  }
  async updateAdminSeries(id: string, data: any) {
    return await this.request(\`/admin/series/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  async getAdminUsers() {
    return await this.request('/admin/users');
  }
  async updateAdminUserRole(id: string, role: string) {
    return await this.request(\`/admin/users/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  }
  async deleteAdminUser(id: string) {
    return await this.request(\`/admin/users/\${id}\`, {
      method: 'DELETE'
    });
  }
  async getAdminFinancials() {
    return await this.request('/admin/financials');
  }
  async updatePlatformFeeRate(rate: number) {
    return await this.request('/admin/financials/config', {
      method: 'PUT',
      body: JSON.stringify({ platformFeeRate: rate })
    });
  }
  async getAdminReports() {
    return await this.request('/admin/reports');
  }
  async updateReportStatus(id: string, status: string) {
    return await this.request(\`/admin/reports/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
}

export const apiService = new YonywoodApiService();
`;

content += newMethods;
fs.writeFileSync('src/services/api.ts', content);
