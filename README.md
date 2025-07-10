# InvoicrGen - Professional Invoice Generator

A modern, responsive web application for creating and managing professional invoices built with Vue.js.

## 🚀 Features

### Core Functionality
- **Create Invoices**: Comprehensive form with client details, items, and calculations
- **Edit Invoices**: Modify existing invoices with full editing capabilities
- **Invoice History**: View all created invoices with search and filter options
- **Invoice Preview**: Real-time preview of invoices before saving
- **Local Storage**: All invoices are saved locally in your browser

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Real-time Calculations**: Automatic tax and total calculations
- **Search & Filter**: Find invoices quickly with advanced filtering options

### Technical Features
- **Vue.js 3**: Modern reactive framework
- **Vue Router**: Client-side routing for smooth navigation
- **Vite**: Fast development and build tool
- **CSS Grid & Flexbox**: Modern layout techniques
- **Local Storage**: Persistent data storage
- **Print Styles**: Optimized for printing invoices

## 📋 Requirements

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd invoicrgen
   
   # Or simply extract the downloaded files
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 📱 Usage

### Creating an Invoice
1. Click "Create Invoice" from the navigation
2. Fill in the invoice details (number, dates, currency)
3. Add client information
4. Add invoice items with descriptions, quantities, and prices
5. Set tax rate if applicable
6. Add payment terms and notes
7. Preview the invoice
8. Save the invoice

### Managing Invoices
- **View History**: See all your invoices with statistics
- **Search**: Find invoices by client name or invoice number
- **Filter**: Filter by date range (today, week, month, year)
- **Sort**: Sort by date, client, amount, or invoice number
- **Edit**: Click edit to modify any invoice
- **Delete**: Remove invoices with confirmation

### Responsive Design
The application is fully responsive and works on:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Optimized for small screens with collapsible navigation

## 🎨 Design Features

### Visual Design
- **Modern Color Scheme**: Professional blues and grays
- **Typography**: Inter font family for excellent readability
- **Icons**: Emoji icons for intuitive navigation
- **Animations**: Smooth transitions and hover effects
- **Cards**: Clean card-based layout

### Accessibility
- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color combinations
- **Focus Indicators**: Clear focus states for all interactive elements

## 🏗️ Project Structure

```
invoicrgen/
├── src/
│   ├── components/
│   │   ├── LandingPage.vue      # Home page with hero and features
│   │   ├── CreateInvoice.vue    # Invoice creation form
│   │   ├── EditInvoice.vue      # Invoice editing form
│   │   └── HistoryPage.vue      # Invoice history and management
│   ├── App.vue                  # Main app component with navigation
│   ├── main.js                  # Vue app entry point
│   └── style.css                # Global styles and utilities
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 💾 Data Storage

All invoice data is stored locally in your browser's localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Data stays private
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Data can be lost if browser data is cleared

## 🎯 Future Enhancements

Potential features for future versions:
- **Export Options**: PDF, Excel, or email export
- **Invoice Templates**: Multiple professional templates
- **Cloud Storage**: Sync across devices
- **Client Management**: Reusable client database
- **Recurring Invoices**: Automated invoice generation
- **Payment Integration**: Online payment processing
- **Multi-currency**: Support for more currencies
- **Invoice Status**: Track paid/unpaid status

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Try a different port
npm run dev -- --port 3001
```

**Dependencies not installing**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Ensure you're using Node.js 14+
node --version
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Try clearing browser cache and localStorage

---

**InvoicrGen** - Making professional invoicing simple and accessible for everyone. 