
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Updated school theme colors with softer, lovable palette
				school: {
					primary: '#4A6FA5', // Softer blue
					secondary: '#6B98D4', // Medium soft blue
					accent: '#E9F3FF', // Light blue
					highlight: '#FFF5E1', // Soft cream for highlights
					success: '#7DB59A', // Soft green
					warning: '#F8C36B', // Soft amber
					light: '#F9FBFF', // Softer light gray
					dark: '#3A4754', // Softer dark gray
					neutral: '#F2F7FA', // Warm neutral
					cream: '#FFF9F0', // Warm cream
					pastel: {
						blue: '#D3E4FD',
						green: '#E1F5E6',
						yellow: '#FFF7CD',
						orange: '#FEE9D6',
						purple: '#E9E5FF',
						pink: '#FFEDF2'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				fadeDown: {
					'0%': { 
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideDown: {
					'0%': { 
						opacity: '0',
						maxHeight: '0'
					},
					'100%': { 
						opacity: '1',
						maxHeight: '1000px'
					}
				},
				pulse: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' }
				},
				softBounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				softFloat: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
				'fadeDown': 'fadeDown 0.4s ease-in-out forwards',
				'slideDown': 'slideDown 0.5s ease-in-out forwards',
				'pulse': 'pulse 3s infinite ease-in-out',
				'soft-bounce': 'softBounce 2s infinite ease-in-out',
				'soft-float': 'softFloat 3s infinite ease-in-out'
			},
			fontFamily: {
				// Improved font stack
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Playfair Display', 'Georgia', 'serif'],
				heading: ['Montserrat', 'sans-serif'],
				accent: ['Poppins', 'sans-serif']
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
				'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.07)',
				'button': '0 2px 8px rgba(74, 111, 165, 0.15)',
				'card': '0 4px 16px rgba(17, 17, 26, 0.08)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
