const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(function({ addComponents }) {
      const pagination = {
        '.pagination': {
          position: 'relative',
          zIndex: '0',
          display: 'inline-flex',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        },
        '.page-link': {
          backgroundColor: '#ffffff',
          color: '#718096',
          border: '1px solid',
          borderColor: '#e2e8f0',
          display: 'inline-flex',
          alignItems: 'center',
          fontWeight: '500',
          fontSize: '0.875',
          lineHeight: '1.25rem',
          padding: '0.5rem 1rem',
          marginLeft: '-1px',
          '&:hover': {
            backgroundColor: '#e6fffa'
          },
        },
        '.page-link:first-child': {
          padding: '0.5rem',
          borderTopLeftRadius: '0.375rem',
          borderBottomLeftRadius: '0.375rem'
        },
        '.page-link:last-child': {
          padding: '0.5rem',
          borderTopRightRadius: '0.375rem',
          borderBottomRightRadius: '0.375rem'
        },
        '.page-active': {
          backgroundColor: '#38b2ac',
          color: '#ffffff',
          borderColor: '#38b2ac',
          '&:hover': {
            backgroundColor: '#38b2ac'
          },
        },
      }

      addComponents(pagination)
    })
  ],
}
