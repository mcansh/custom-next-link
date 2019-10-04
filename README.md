# @mcansh/custom-next-link

A next.js link wrapper that renders a normal anchor tag with `target="_blank"` and `rel="noopener external nofollow noreferrer"` or a next link

## usage

```tsx
import { Link } from '@mcansh/custom-next-link';

export default () => (
  <Link href="https://mcan.sh">
    <a>Hello World</a>
  </Link>
);
```
