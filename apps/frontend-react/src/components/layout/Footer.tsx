import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Instagram, Mail, Youtube } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Sessions', href: '/sessions' },
  ],
  community: [
    { label: 'Forum', href: '/forum' },
    { label: 'Updates', href: '/updates' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Connect', href: '/connect' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Code of Conduct', href: '#' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/techandinnovation', label: 'GitHub' },
  { icon: Youtube, href: 'https://youtube.com/@techandinnovationclub', label: 'Youtube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/tech-and-innovation', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/techandinnovationclub', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/icon.png" width={60} alt="" />
                <span className="font-display font-bold text-xl text-foreground">
                  Tech & Innovation
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Empowering students to learn, build, and innovate. Join the largest
                student-led tech community and shape your future in technology.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target='_blank'
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Platform
              </h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Community
              </h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tech & Innovation. All rights reserved.
          </p>
          <a
            href="mailto:techandinnovation@ggits.org"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            techandinnovation@ggits.org
          </a>
        </div>
      </div>
    </footer>
  );
}
