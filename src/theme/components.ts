import { designSystem } from './design-system';

export const componentStyles = {
  // Buttons
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
      fontSize: designSystem.typography.size.sm,
      fontWeight: designSystem.typography.weight.medium,
      borderRadius: designSystem.radius.md,
      border: 'none',
      cursor: 'pointer',
      transition: `all ${designSystem.transitions.fast}`,
    },
    variants: {
      primary: {
        backgroundColor: designSystem.colors.primary.blue,
        color: designSystem.colors.text.white,
        '&:hover': {
          backgroundColor: designSystem.colors.primary.blueDark,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: designSystem.colors.text.secondary,
        border: `1px solid ${designSystem.colors.border}`,
        '&:hover': {
          backgroundColor: designSystem.colors.background,
        },
      },
      success: {
        backgroundColor: designSystem.colors.success,
        color: designSystem.colors.text.white,
        '&:hover': {
          opacity: 0.9,
        },
      },
    },
    sizes: {
      sm: {
        padding: `${designSystem.spacing.xs} ${designSystem.spacing.md}`,
        fontSize: designSystem.typography.size.xs,
      },
      md: {
        padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
        fontSize: designSystem.typography.size.sm,
      },
      lg: {
        padding: `${designSystem.spacing.md} ${designSystem.spacing.xl}`,
        fontSize: designSystem.typography.size.base,
      },
    },
  },

  // Cards
  card: {
    base: {
      backgroundColor: designSystem.colors.card,
      borderRadius: designSystem.radius.lg,
      border: `1px solid ${designSystem.colors.border}`,
      padding: designSystem.spacing.lg,
      boxShadow: designSystem.shadows.md,
      transition: `box-shadow ${designSystem.transitions.normal}`,
    },
    hover: {
      boxShadow: designSystem.shadows.lg,
    },
  },

  // Inputs
  input: {
    base: {
      width: '100%',
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
      fontSize: designSystem.typography.size.sm,
      color: designSystem.colors.text.primary,
      backgroundColor: designSystem.colors.background,
      border: `1px solid ${designSystem.colors.border}`,
      borderRadius: designSystem.radius.md,
      outline: 'none',
      transition: `all ${designSystem.transitions.fast}`,
      '&:focus': {
        borderColor: designSystem.colors.primary.blue,
        boxShadow: `0 0 0 3px ${designSystem.colors.primary.blue}20`,
      },
    },
  },

  // Tables
  table: {
    header: {
      backgroundColor: designSystem.colors.background,
      color: designSystem.colors.text.secondary,
      fontSize: designSystem.typography.size.xs,
      fontWeight: designSystem.typography.weight.semibold,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
      borderBottom: `1px solid ${designSystem.colors.border}`,
    },
    cell: {
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
      fontSize: designSystem.typography.size.sm,
      color: designSystem.colors.text.primary,
      borderBottom: `1px solid ${designSystem.colors.border}`,
    },
    row: {
      hover: {
        backgroundColor: designSystem.colors.background,
      },
    },
  },

  // Badges
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${designSystem.spacing.xs} ${designSystem.spacing.sm}`,
      borderRadius: designSystem.radius.full,
      fontSize: designSystem.typography.size.xs,
      fontWeight: designSystem.typography.weight.medium,
    },
    variants: {
      success: {
        backgroundColor: `${designSystem.colors.success}20`,
        color: designSystem.colors.success,
      },
      warning: {
        backgroundColor: `${designSystem.colors.warning}20`,
        color: designSystem.colors.warning,
      },
      error: {
        backgroundColor: `${designSystem.colors.error}20`,
        color: designSystem.colors.error,
      },
      info: {
        backgroundColor: `${designSystem.colors.primary.blue}20`,
        color: designSystem.colors.primary.blue,
      },
    },
  },

  // Status Dots
  statusDot: {
    base: {
      width: '8px',
      height: '8px',
      borderRadius: designSystem.radius.full,
      display: 'inline-block',
    },
    variants: {
      running: {
        backgroundColor: designSystem.colors.machine.running,
      },
      idle: {
        backgroundColor: designSystem.colors.machine.idle,
      },
      offline: {
        backgroundColor: designSystem.colors.machine.offline,
      },
      maintenance: {
        backgroundColor: designSystem.colors.machine.maintenance,
      },
      setup: {
        backgroundColor: designSystem.colors.machine.setup,
      },
    },
  },

  // Sidebar
  sidebar: {
    base: {
      width: designSystem.layout.sidebarWidth,
      backgroundColor: designSystem.colors.sidebar,
      color: designSystem.colors.text.light,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
    },
    item: {
      base: {
        display: 'flex',
        alignItems: 'center',
        padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`,
        borderRadius: designSystem.radius.md,
        fontSize: designSystem.typography.size.base,
        fontWeight: designSystem.typography.weight.medium,
        color: designSystem.colors.text.light,
        transition: `all ${designSystem.transitions.fast}`,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: designSystem.colors.sidebarHover,
          color: designSystem.colors.text.white,
        },
      },
      active: {
        backgroundColor: '#F97316', // Orange for ShopWorx clone
        color: designSystem.colors.text.white,
      },
    },
  },

  // Header
  header: {
    base: {
      height: designSystem.layout.headerHeight,
      backgroundColor: designSystem.colors.card,
      borderBottom: `1px solid ${designSystem.colors.border}`,
      padding: `0 ${designSystem.spacing.xl}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};