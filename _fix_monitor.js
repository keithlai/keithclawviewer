const fs = require('fs');
let d = fs.readFileSync('C:\\Users\\Administrator\\workspace-dev\\keithclawviewer\\container\\public\\index.html', 'utf8');
d = d.replace("switchTab('admin')", "switchTab('monitor')");
d = d.replaceAll('tab-admin', 'tab-monitor');
fs.writeFileSync('C:\\Users\\Administrator\\workspace-dev\\keithclawviewer\\container\\public\\index.html', d, 'utf8');
console.log('FIXED');
