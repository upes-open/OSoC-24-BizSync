app.use(express.json());
app.use(cors());

// Dashboard items
const dashboardItems = [
  { name: "Home", path: "home" },
  { name: "Receivables", path: "receivables" },
  { name: "Spends", path: "spends" },
  { name: "Inventory", path: "inventory" },
  { name: "Notification", path: "notification" },
  { name: "Supplier", path: "supplier" },
  { name: "Staff", path: "staff" },
  { name: "Financial", path: "financial" },
  { name: "Sales", path: "sales" },
  { name: "Reports", path: "reports" },
];

// Get all dashboard items
app.get('/api/dashboard-items', (req, res) => {
  res.json(dashboardItems);
});