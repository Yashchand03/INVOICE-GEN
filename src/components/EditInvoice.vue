<template>
  <div class="edit-invoice">
    <div class="container">
      <div class="page-header">
        <h1>Edit Invoice</h1>
        <p>Update the invoice details below</p>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>Loading invoice...</p>
      </div>

      <div v-else-if="!invoice" class="error">
        <h2>Invoice Not Found</h2>
        <p>The invoice you're looking for doesn't exist or has been deleted.</p>
        <router-link to="/history" class="btn btn-primary">
          <span>←</span>
          Back to History
        </router-link>
      </div>

      <form v-else @submit.prevent="updateInvoice" class="invoice-form">
        <div class="form-sections">
          <!-- Invoice Details Section -->
          <div class="form-section card">
            <h2>Invoice Details</h2>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Invoice Number</label>
                <input 
                  type="text" 
                  class="form-input" 
                  v-model="invoice.invoiceNumber"
                  placeholder="e.g., INV-2024-001"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">Invoice Date</label>
                <input 
                  type="date" 
                  class="form-input" 
                  v-model="invoice.invoiceDate"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">Due Date</label>
                <input 
                  type="date" 
                  class="form-input" 
                  v-model="invoice.dueDate"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">Currency</label>
                <select class="form-select" v-model="invoice.currency" required>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Client Information Section -->
          <div class="form-section card">
            <h2>Client Information</h2>
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Client Name</label>
                <input 
                  type="text" 
                  class="form-input" 
                  v-model="invoice.clientName"
                  placeholder="Enter client name"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">Client Email</label>
                <input 
                  type="email" 
                  class="form-input" 
                  v-model="invoice.clientEmail"
                  placeholder="client@example.com"
                  required
                >
              </div>
              <div class="form-group">
                <label class="form-label">Client Phone</label>
                <input 
                  type="tel" 
                  class="form-input" 
                  v-model="invoice.clientPhone"
                  placeholder="+1 (555) 123-4567"
                >
              </div>
              <div class="form-group">
                <label class="form-label">Client Address</label>
                <textarea 
                  class="form-textarea" 
                  v-model="invoice.clientAddress"
                  placeholder="Enter client address"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Items Section -->
          <div class="form-section card">
            <div class="section-header">
              <h2>Invoice Items</h2>
              <button 
                type="button" 
                class="btn btn-secondary"
                @click="addItem"
              >
                <span>➕</span>
                Add Item
              </button>
            </div>

            <div class="items-list">
              <div 
                v-for="(item, index) in invoice.items" 
                :key="index"
                class="item-row"
              >
                <div class="item-inputs">
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <input 
                      type="text" 
                      class="form-input" 
                      v-model="item.description"
                      placeholder="Item description"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Quantity</label>
                    <input 
                      type="number" 
                      class="form-input" 
                      v-model="item.quantity"
                      min="1"
                      step="1"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Unit Price</label>
                    <input 
                      type="number" 
                      class="form-input" 
                      v-model="item.unitPrice"
                      min="0"
                      step="0.01"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="form-label">Total</label>
                    <input 
                      type="text" 
                      class="form-input" 
                      :value="formatCurrency(item.quantity * item.unitPrice)"
                      readonly
                    >
                  </div>
                  <div class="item-actions">
                    <button 
                      type="button" 
                      class="btn btn-danger"
                      @click="removeItem(index)"
                      :disabled="invoice.items.length === 1"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Totals Section -->
            <div class="totals-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>Tax Rate (%):</span>
                <input 
                  type="number" 
                  class="form-input tax-input" 
                  v-model="invoice.taxRate"
                  min="0"
                  max="100"
                  step="0.01"
                >
              </div>
              <div class="total-row">
                <span>Tax Amount:</span>
                <span>{{ formatCurrency(taxAmount) }}</span>
              </div>
              <div class="total-row total-final">
                <span>Total:</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>
          </div>

          <!-- Notes Section -->
          <div class="form-section card">
            <h2>Additional Notes</h2>
            <div class="form-group">
              <label class="form-label">Payment Terms</label>
              <textarea 
                class="form-textarea" 
                v-model="invoice.paymentTerms"
                placeholder="e.g., Net 30 days, Payment due upon receipt"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Notes</label>
              <textarea 
                class="form-textarea" 
                v-model="invoice.notes"
                placeholder="Any additional notes or special instructions"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="previewInvoice">
            <span>👁️</span>
            Preview
          </button>
          <button type="button" class="btn btn-danger" @click="deleteInvoice">
            <span>🗑️</span>
            Delete Invoice
          </button>
          <button type="submit" class="btn btn-primary">
            <span>💾</span>
            Update Invoice
          </button>
        </div>
      </form>
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
                <p><strong>Invoice #:</strong> {{ invoice.invoiceNumber }}</p>
                <p><strong>Date:</strong> {{ formatDate(invoice.invoiceDate) }}</p>
                <p><strong>Due Date:</strong> {{ formatDate(invoice.dueDate) }}</p>
              </div>
            </div>

            <!-- Client Info -->
            <div class="preview-client">
              <h3>Bill To:</h3>
              <p><strong>{{ invoice.clientName }}</strong></p>
              <p>{{ invoice.clientEmail }}</p>
              <p v-if="invoice.clientPhone">{{ invoice.clientPhone }}</p>
              <p v-if="invoice.clientAddress">{{ invoice.clientAddress }}</p>
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
                  <tr v-for="item in invoice.items" :key="item.description">
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
                <span>Tax ({{ invoice.taxRate }}%):</span>
                <span>{{ formatCurrency(taxAmount) }}</span>
              </div>
              <div class="preview-total-row preview-total-final">
                <span>Total:</span>
                <span>{{ formatCurrency(total) }}</span>
              </div>
            </div>

            <!-- Notes -->
            <div v-if="invoice.paymentTerms || invoice.notes" class="preview-notes">
              <div v-if="invoice.paymentTerms">
                <h4>Payment Terms:</h4>
                <p>{{ invoice.paymentTerms }}</p>
              </div>
              <div v-if="invoice.notes">
                <h4>Notes:</h4>
                <p>{{ invoice.notes }}</p>
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
  name: 'EditInvoice',
  data() {
    return {
      invoice: null,
      loading: true,
      showPreview: false
    }
  },
  computed: {
    subtotal() {
      if (!this.invoice) return 0
      return this.invoice.items.reduce((sum, item) => {
        return sum + (item.quantity * item.unitPrice)
      }, 0)
    },
    taxAmount() {
      return this.subtotal * (this.invoice.taxRate / 100)
    },
    total() {
      return this.subtotal + this.taxAmount
    }
  },
  mounted() {
    this.loadInvoice()
  },
  methods: {
    loadInvoice() {
      const invoiceId = this.$route.params.id
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
      this.invoice = invoices.find(inv => inv.id === invoiceId)
      this.loading = false
    },
    addItem() {
      this.invoice.items.push({
        description: '',
        quantity: 1,
        unitPrice: 0
      })
    },
    removeItem(index) {
      if (this.invoice.items.length > 1) {
        this.invoice.items.splice(index, 1)
      }
    },
    formatCurrency(amount) {
      const currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'CAD': 'C$',
        'AUD': 'A$'
      }
      const symbol = currencySymbols[this.invoice.currency] || '$'
      return `${symbol}${amount.toFixed(2)}`
    },
    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString()
    },
    previewInvoice() {
      this.showPreview = true
    },
    closePreview() {
      this.showPreview = false
    },
    updateInvoice() {
      // Get existing invoices
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
      
      // Find and update the invoice
      const index = invoices.findIndex(inv => inv.id === this.invoice.id)
      if (index !== -1) {
        invoices[index] = { ...this.invoice }
        localStorage.setItem('invoices', JSON.stringify(invoices))
        alert('Invoice updated successfully!')
        this.$router.push('/history')
      }
    },
    deleteInvoice() {
      if (confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]')
        const filteredInvoices = invoices.filter(inv => inv.id !== this.invoice.id)
        localStorage.setItem('invoices', JSON.stringify(filteredInvoices))
        alert('Invoice deleted successfully!')
        this.$router.push('/history')
      }
    }
  }
}
</script>

<style scoped>
.edit-invoice {
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

.loading {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 4rem 0;
}

.error h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.error p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.form-section {
  padding: 2rem;
}

.form-section h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item-row {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: #f9fafb;
}

.item-inputs {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.item-actions {
  display: flex;
  align-items: center;
}

.totals-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-weight: 500;
}

.total-final {
  font-weight: 700;
  font-size: 1.25rem;
  border-top: 2px solid #e5e7eb;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.tax-input {
  width: 100px;
  text-align: center;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
  flex-wrap: wrap;
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
  .item-inputs {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: center;
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
  .form-section {
    padding: 1rem;
  }
  
  .item-row {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
}
</style> 