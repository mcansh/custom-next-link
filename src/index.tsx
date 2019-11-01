import { UrlObject, format, parse } from 'url';

import React from 'react';
import NextLink, { LinkProps } from 'next/link';

const LinkContext = React.createContext<string | undefined>(undefined);

const LinkProvider: React.FC<{ value: string }> = ({ value, children }) => (
  <LinkContext.Provider value={value}>{children}</LinkContext.Provider>
);

function useCheckSameOrigin(url: UrlObject | string) {
  const domain = React.useContext(LinkContext);
  if (!domain) {
    throw new Error(`Link must be used within a LinkProvider`);
  }

  const href = typeof url === 'string' ? parse(url) : url;

  // if href doesnt have a protocol or a hostname, it's _probably_ an internal link
  if (!href.protocol || !href.hostname) return true;

  // check if the value in the LinkProvider starts with https? if not, add both to regex
  const regex = new RegExp(
    /^https?/.test(domain) ? domain : `http://${domain}|https://${domain}`
  );

  // compare href to value in LinkProvider
  return regex.test(href.hostname);
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

export { Link, LinkProvider, useCheckSameOrigin };
