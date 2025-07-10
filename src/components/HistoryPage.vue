<template>
  <div class="history-page">
    <div class="container">
      <div class="page-header">
        <h1>Invoice History</h1>
        <p>View and manage all your created invoices</p>
      </div>

      <!-- Search and Filter Section -->
      <div class="filters-section card">
        <div class="filters-grid">
          <div class="form-group">
            <label class="form-label">Search Invoices</label>
            <input 
              type="text" 
              class="form-input" 
              v-model="searchQuery"
              placeholder="Search by client name, invoice number..."
            >
          </div>
          <div class="form-group">
            <label class="form-label">Filter by Date</label>
            <select class="form-select" v-model="dateFilter">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Sort By</label>
            <select class="form-select" v-model="sortBy">
              <option value="date">Date Created</option>
              <option value="client">Client Name</option>
              <option value="amount">Total Amount</option>
              <option value="number">Invoice Number</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon">📄</div>
            <div class="stat-content">
              <h3>{{ filteredInvoices.length }}</h3>
              <p>Total Invoices</p>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <h3>{{ formatCurrency(totalRevenue) }}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <h3>{{ thisMonthInvoices.length }}</h3>
              <p>This Month</p>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>{{ uniqueClients.length }}</h3>
              <p>Unique Clients</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoices List -->
      <div class="invoices-section">
        <div v-if="filteredInvoices.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h2>No Invoices Found</h2>
          <p v-if="searchQuery || dateFilter">
            No invoices match your current search criteria. Try adjusting your filters.
          </p>
          <p v-else>
            You haven't created any invoices yet. Start by creating your first invoice!
          </p>
          <router-link to="/create" class="btn btn-primary">
            <span>➕</span>
            Create Your First Invoice
          </router-link>
        </div>

        <div v-else class="invoices-grid">
          <div 
            v-for="invoice in filteredInvoices" 
            :key="invoice.id"
            class="invoice-card card"
          >
            <div class="invoice-header">
              <div class="invoice-number">
                <h3>{{ invoice.invoiceNumber }}</h3>
                <span class="invoice-date">{{ formatDate(invoice.createdAt) }}</span>
              </div>
              <div class="invoice-amount">
                <span class="amount">{{ formatCurrency(invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)) }}</span>
              </div>
            </div>

            <div class="invoice-details">
              <div class="client-info">
                <h4>{{ invoice.clientName }}</h4>
                <p>{{ invoice.clientEmail }}</p>
              </div>
              
              <div class="invoice-meta">
                <div class="meta-item">
                  <span class="meta-label">Invoice Date:</span>
                  <span>{{ formatDate(invoice.invoiceDate) }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Due Date:</span>
                  <span>{{ formatDate(invoice.dueDate) }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Items:</span>
                  <span>{{ invoice.items.length }} item(s)</span>
                </div>
              </div>
            </div>

            <div class="invoice-actions">
              <button 
                class="btn btn-secondary"
                @click="previewInvoice(invoice)"
              >
                <span>👁️</span>
                Preview
              </button>
              <router-link 
                :to="`/edit/${invoice.id}`"
                class="btn btn-primary"
              >
                <span>✏️</span>
                Edit
              </router-link>
              <button 
                class="btn btn-danger"
                @click="deleteInvoice(invoice.id)"
              >
                <span>🗑️</span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="modal-overlay" @click="closePreview">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Invoice Preview</h3>
          <button class="modal-close" @click="closePreview">×</button>
        </div>
        <div class="modal-body">
          <div class="invoice-preview-content">
            <!-- Invoice Header -->
            <div class="preview-header">
              <div class="preview-logo">
                <h2>InvoicrGen</h2>
              </div>
              <div class="preview-invoice-info">
                <h1>INVOICE</h1>
                <p><strong>Invoice #:</strong> {{ previewInvoice.invoiceNumber }}</p>
                <p><strong>Date:</strong> {{ formatDate(previewInvoice.invoiceDate) }}</p>
                <p><strong>Due Date:</strong> {{ formatDate(previewInvoice.dueDate) }}</p>
              </div>
            </div>

            <!-- Client Info -->
            <div class="preview-client">
              <h3>Bill To:</h3>
              <p><strong>{{ previewInvoice.clientName }}</strong></p>
              <p>{{ previewInvoice.clientEmail }}</p>
              <p v-if="previewInvoice.clientPhone">{{ previewInvoice.clientPhone }}</p>
              <p v-if="previewInvoice.clientAddress">{{ previewInvoice.clientAddress }}</p>
            </div>

            <!-- Items Table -->
            <div class="preview-items">
              <table class="preview-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in previewInvoice.items" :key="item.description">
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatCurrency(item.unitPrice) }}</td>
                    <td>{{ formatCurrency(item.quantity * item.unitPrice) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totals -->
            <div class="preview-totals">
              <div class="preview-total-row">
                <span>Subtotal:</span>
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="preview-total-row">
                <span>Tax ({{ previewInvoice.taxRate }}%):</span>
                <span>{{ formatCurrency(taxAmount) }}</span>
              </div>
              <div class="preview-total-row preview-total-final">
                <span>Total:</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="previewInvoice.paymentTerms || previewInvoice.notes" class="preview-notes">
              <div v-if="previewInvoice.paymentTerms">
                <h4>Payment Terms:</h4>
                <p>{{ previewInvoice.paymentTerms }}</p>
              </div>
              <div v-if="previewInvoice.notes">
                <h4>Notes:</h4>
                <p>{{ previewInvoice.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  data() {
    return {
      invoices: [],
      searchQuery: '',
      dateFilter: '',
      sortBy: 'date',
      showPreview: false,
      previewInvoice: null
    }
  },
  computed: {
    filteredInvoices() {
      let filtered = [...this.invoices]

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(invoice => 
          invoice.clientName.toLowerCase().includes(query) ||
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.clientEmail.toLowerCase().includes(query)
        )
      }

      // Apply date filter
      if (this.dateFilter) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)

        filtered = filtered.filter(invoice => {
          const invoiceDate = new Date(invoice.createdAt)
          switch (this.dateFilter) {
            case 'today':
              return invoiceDate >= today
            case 'week':
              return invoiceDate >= weekAgo
            case 'month':
              return invoiceDate >= monthAgo
            case 'year':
              return invoiceDate >= yearAgo
            default:
              return true
          }
        })
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'date':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'client':
            return a.clientName.localeCompare(b.clientName)
          case 'amount':
            const aTotal = a.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
            const bTotal = b.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
            return bTotal - aTotal
          case 'number':
            return a.invoiceNumber.localeCompare(b.invoiceNumber)
          default:
            return 0
        }
      })

      return filtered
    },
    totalRevenue() {
      return this.filteredInvoices.reduce((sum, invoice) => {
        return sum + invoice.items.reduce((itemSum, item) => itemSum + (item.quantity * item.unitPrice), 0)
      }, 0)
    },
    thisMonthInvoices() {
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      return this.invoices.filter(invoice => new Date(invoice.createdAt) >= monthStart)
    },
    uniqueClients() {
      const clients = new Set(this.invoices.map(invoice => invoice.clientName))
      return Array.from(clients)
    },
    subtotal() {
      if (!this.previewInvoice) return 0
      return this.previewInvoice.items.reduce((sum, item) => {
        return sum + (item.quantity * item.unitPrice)
      }, 0)
    },
    taxAmount() {
      return this.subtotal * (this.previewInvoice.taxRate / 100)
    },
    total() {
      return this.subtotal + this.taxAmount
    }
  },
  mounted() {
    this.loadInvoices()
  },
  methods: {
    loadInvoices() {
      this.invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
    },
    formatCurrency(amount) {
      return `$${amount.toFixed(2)}`
    },
    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString()
    },
    previewInvoice(invoice) {
      this.previewInvoice = invoice
      this.showPreview = true
    },
    closePreview() {
      this.showPreview = false
      this.previewInvoice = null
    },
    deleteInvoice(invoiceId) {
      if (confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
        const filteredInvoices = invoices.filter(inv => inv.id !== invoiceId)
        localStorage.setItem('invoices', JSON.stringify(filteredInvoices))
        this.loadInvoices()
        alert('Invoice deleted successfully!')
      }
    }
  }
}
</script>

<style scoped>
.history-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #6b7280;
  font-size: 1.125rem;
}

.filters-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.stats-section {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.stat-content h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.invoices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.invoice-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.invoice-card:hover {
  transform: translateY(-2px);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.invoice-number h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.125rem;
}

.invoice-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.invoice-amount .amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
}

.invoice-details {
  margin-bottom: 1.5rem;
}

.client-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.client-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.invoice-meta {
  margin-top: 1rem;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.meta-label {
  color: #6b7280;
}

.invoice-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.invoice-actions .btn {
  flex: 1;
  min-width: 80px;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 0.75rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 2rem;
}

.invoice-preview-content {
  font-family: 'Courier New', monospace;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000;
}

.preview-logo h2 {
  margin: 0;
  color: #2563eb;
}

.preview-invoice-info h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
}

.preview-invoice-info p {
  margin: 0.25rem 0;
}

.preview-client {
  margin-bottom: 2rem;
}

.preview-client h3 {
  margin-bottom: 0.5rem;
}

.preview-client p {
  margin: 0.25rem 0;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.preview-table th,
.preview-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.preview-table th {
  background: #f9fafb;
  font-weight: 600;
}

.preview-totals {
  margin-bottom: 2rem;
}

.preview-total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.preview-total-final {
  font-weight: 700;
  font-size: 1.25rem;
  border-top: 2px solid #000;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.preview-notes {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.preview-notes h4 {
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .invoices-grid {
    grid-template-columns: 1fr;
  }
  
  .invoice-actions {
    flex-direction: column;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .preview-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .preview-table {
    font-size: 0.875rem;
  }
  
  .preview-table th,
  .preview-table td {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-body {
    padding: 1rem;
  }
}
</style> 