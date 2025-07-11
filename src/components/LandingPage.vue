<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Invoicely
              <span class="text-gradient">Made Simple</span>
            </h1>
            <p class="hero-subtitle">
              Simple invoice creation for freelancers and small businesses. 
              Streamline your billing process with our intuitive platform.
            </p>
            <div class="hero-actions">
              <router-link to="/create" class="btn btn-primary btn-large">
                <span>🚀</span>
                Create Your First Invoice
              </router-link>
              <router-link to="/history" class="btn btn-secondary btn-large">
                <span>📋</span>
                View History
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <div class="invoice-preview">
              <div class="invoice-header">
                <h3>INVOICELY</h3>
                <div class="invoice-number">#INV-2024-001</div>
              </div>
              <div class="invoice-body">
                <div class="invoice-row">
                  <span>Web Development</span>
                  <span>$1,500.00</span>
                </div>
                <div class="invoice-row">
                  <span>UI/UX Design</span>
                  <span>$800.00</span>
                </div>
                <div class="invoice-total">
                  <span>Total</span>
                  <span>$2,300.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header text-center">
          <h2>Why Choose Invoicely?</h2>
          <p>Everything you need to create simple invoices quickly.</p>
        </div>
        
        <div class="grid grid-3">
          <div class="feature-card card">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Create invoices in under 2 minutes with our easy process.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">🎨</div>
            <h3>Professional Design</h3>
            <p>Clean templates that make your invoices look professional.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Create and manage invoices from any device.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">💾</div>
            <h3>Secure Storage</h3>
            <p>All your invoices are safely stored and easily accessible.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">🔄</div>
            <h3>Easy Editing</h3>
            <p>Update invoice details anytime with our simple edit interface.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">📊</div>
            <h3>History Tracking</h3>
            <p>Keep track of all your invoices with our history page.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content text-center">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of professionals who trust Invoicely for their invoicing needs.</p>
          <router-link to="/create" class="btn btn-primary btn-large">
            <span>🎯</span>
            Start Creating Invoices
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.text-gradient {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
}

/* Invoice Preview */
.invoice-preview {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.invoice-preview:hover {
  transform: rotate(0deg) scale(1.02);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.invoice-header h3 {
  color: #1f2937;
  margin: 0;
}

.invoice-number {
  color: #6b7280;
  font-weight: 600;
}

.invoice-body {
  color: #374151;
}

.invoice-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.invoice-total {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: 700;
  font-size: 1.125rem;
  border-top: 2px solid #e5e7eb;
  margin-top: 1rem;
}

/* Features Section */
.features {
  padding: 6rem 0;
  background: #f9fafb;
}

.section-header {
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .invoice-preview {
    transform: none;
    margin-top: 2rem;
  }
  
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 4rem 0 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .btn-large {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
  }
  
  .grid-3 {
    grid-template-columns: 1fr;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
}
</style> 