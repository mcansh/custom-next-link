import { UrlObject, format, parse } from 'url';

import React from 'react';
import NextLink, { LinkProps } from 'next/link';

const LinkContext = React.createContext<string | undefined>(undefined);

const LinkProvider: React.FC<{ value: string }> = ({ value, children }) => (
  <LinkContext.Provider value={value}>{children}</LinkContext.Provider>
);

function useCheckSameOrigin(url: UrlObject | string) {
  const domain = React.useContext(LinkContext);
  const href = typeof url === 'string' ? parse(url) : url;
  if (!href.protocol || !href.hostname) return true;
  if (!/^https?/.test(href.protocol)) return false;
  return href.hostname === domain;
}

interface Props extends LinkProps {
  newTab?: boolean;
}

const Link: React.FC<Props> = ({ children, href, newTab = true, ...props }) => {
  const isSameOrigin = useCheckSameOrigin(href);

  if (isSameOrigin) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <>
      {React.Children.map(children, child => {
        const formatted = typeof href === 'string' ? href : format(href);
        const options = newTab
          ? {
              href: formatted,
              target: '_blank',
              rel: 'noopener external nofollow noreferrer',
            }
          : { href: formatted };

        return React.cloneElement(child as any, options);
      })}
    </>
  );
};

export { Link, LinkProvider };
