import { saveAs } from 'file-saver';

function exportToCSV(filename, rows) {
  const csvContent =  rows.map(e => e.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}

export default exportToCSV;
