module.exports = {
  theme: {
    placeholderColor: {
      muted: 'var(--text_placeholder)',
    },
    borderColor: () => ({
      default: 'var(--separator_common)',
      input: 'var(--input_border)',
      accent: 'var(--accent)',
      destructive: 'var(--field_error_border)'
    }),
    boxShadow: {
      accent: '0 0 0 3px rgba(164, 202, 254, 0.45)',
      destructive: '0 0 0 3px rgba(250, 118, 118, 0.45)',
    },
    backgroundColor: {
      white: '#ffffff',
      black: '#000000',
      accent: 'var(--accent)',
      current: 'currentColor',
      transparent: 'transparent',
      donut: 'var(--donut)',
      content: 'var(--background_content)',
      input: 'var(--input_background)',
      destructive: 'var(--destructive)',
      tint: 'var(--content_tint_background)',
      header: {
        alternate: 'var(--header_alternate_background)'
      },
      button: {
        primary: 'var(--button_primary_background)',
        secondary: 'var(--button_secondary_background)',
        destructive: 'var(--button_secondary_background)'
      },
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
    },
    textColor: {
      white: '#ffffff',
      black: '#000000',
      accent: 'var(--accent)',
      name: 'var(--text_name)',
      placeholder: 'var(--text_placeholder)',
      donut: 'var(--donut)',
      primary: 'var(--text_primary)',
      secondary: 'var(--text_secondary)',
      like: 'var(--like_text_tint)',
      link: 'var(--text_link)',
      destructive: 'var(--destructive)',
      header: {
        default: 'var(--header_text)',
        tint: 'var(--header_tint)'
      },
      button: {
        primary: 'var(--button_primary_foreground)',
        secondary: 'var(--button_secondary_foreground)',
        destructive: 'var(--button_secondary_destructive_foreground)',
      },
      tabbar: {
        inactive: 'var(--tabbar_inactive_icon)',
        active: 'var(--tabbar_active_icon)'
      },
    },
    extend: {
      height: {
        panelheader: 'var(--panelheader_height)',
        tabbarheight: 'var(--tabbar_height)',
      },
      spacing: {
        tabbarheight: 'var(--tabbar_height)',
      },
      scale: {
        mirror: '-1',
      },
    }
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
  purge: false,
  future: {
    purgeLayersByDefault: true,
  }
}
