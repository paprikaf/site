import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { publicLinks } from '@/data/portfolio';

export function Nav() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-nav__inner">
        <Link
          className="site-nav__brand"
          to="/"
          aria-label="Ahmed Felfel, home"
        >
          <img
            className="site-nav__mark"
            src="/brand-mark.png"
            alt=""
            width={38}
            height={38}
          />
          <span>
            Ahmed Felfel
            <small>0→1 Product Engineer</small>
          </span>
        </Link>

        <div className="site-nav__links">
          {onHome ? <a href="#work">Work</a> : <a href="/#work">Work</a>}
          {onHome ? (
            <a href="#role-fit">Role fit</a>
          ) : (
            <a href="/#role-fit">Role fit</a>
          )}
          {onHome ? (
            <a className="site-nav__experience" href="#experience">
              Experience
            </a>
          ) : null}
          <Link to="/resume">Résumé</Link>
          <a className="site-nav__contact" href={publicLinks.email}>
            Contact <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </nav>
  );
}
