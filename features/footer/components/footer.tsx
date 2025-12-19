import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/projects", label: "Projects" },
    { href: "/careers", label: "Careers" },
  ],
  resources: [
    { href: "/downloads", label: "Downloads" },
    { href: "/compliance", label: "Compliance" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative text-white mt-auto border-t border-white/10"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-heading font-normal mb-4">
              Nexbaron Services
            </h3>
            <p className="text-sm text-white/80">
              Leading infrastructure solutions provider delivering excellence
              across multiple industries.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-heading font-normal mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-heading font-normal mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            © {currentYear} Nexbaron Services Private Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
