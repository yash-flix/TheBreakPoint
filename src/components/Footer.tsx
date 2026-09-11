import { Link } from 'react-router-dom';
import { Twitter, MessageCircle, Mail } from 'lucide-react';

const SERVICES = [
  'AI agents & orchestration',
  'Retrieval & knowledge systems',
  'Conversational & WhatsApp AI',
  'Workflow automation',
  'Evaluation & observability',
];

const Footer = () => {
  return (
    <footer className="border-t hairline bg-ink-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-2xl font-medium tracking-[-0.02em] text-mist-50">Breakpoint</h3>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mist-500">
              We design, build and evaluate AI systems that hold up in production. Grounded
              answers, traced runs, and a number to prove it works.
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <h4 className="eyebrow mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-mist-500">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate + connect */}
          <div className="md:col-span-3">
            <h4 className="eyebrow mb-5">Navigate</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/work"
                  className="text-sm text-mist-500 transition-colors hover:text-mist-50"
                >
                  Selected work
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-mist-500 transition-colors hover:text-mist-50"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <h4 className="eyebrow mb-5 mt-10">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://x.com/breakpoint31411"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Breakpoint on X"
                className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-mist-500 transition-all duration-300 hover:border-ice-300/40 hover:text-ice-300"
              >
                <Twitter size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://wa.me/918329761217"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Breakpoint on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-mist-500 transition-all duration-300 hover:border-ice-300/40 hover:text-ice-300"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:thebreakpoint.inc@gmail.com"
                aria-label="Email Breakpoint"
                className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-mist-500 transition-all duration-300 hover:border-ice-300/40 hover:text-ice-300"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-700">
            © {new Date().getFullYear()} Breakpoint. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-700">
            Built in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
