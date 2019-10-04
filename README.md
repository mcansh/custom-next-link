# @mcansh/custom-next-link

A next.js link wrapper that renders a normal anchor tag with `target="_blank"` and `rel="noopener external nofollow noreferrer"` or a next link

## usage

```tsx
import { LinkProvider, Link } from '@mcansh/custom-next-link';

export default () => (
  <LinkProvider value="https://mcan.sh">
    <Link href="https://google.com">
      <a>Hello World</a>
    </Link>
  </LinkProvider>
);

//=> <a href="https://google.com" target="_blank" rel="noopener external nofollow noreferrer">Hello World</a>
```
