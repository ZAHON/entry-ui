# resolveQrl

Asynchronously resolves a QRL reference into its underlying value or symbol.

[![Source](https://img.shields.io/badge/Source-GitHub-gray?logo=github)](https://github.com/ZAHON/entry-ui/tree/main/packages/qwik/src/utilities/resolve-qrl)
[![Issue](https://img.shields.io/badge/Report-Issue-red?logo=github)](https://github.com/ZAHON/entry-ui/issues/new?title=[Entry%20UI%20Qwik%20resolveQrl]%20Issue)

## Import

```ts
import { resolveQrl } from '@entry-ui/qwik/resolve-qrl';
```

## Usage

Use `resolveQrl` when you need to asynchronously resolve a QRL reference into its underlying value or symbol. This handles specialized lazy-loaded code references embedded within HTML attributes, leveraging framework mechanisms to fetch the target JavaScript chunk and retrieve the exported symbol.

Additionally, `resolveQrl` optimizes performance by checking whether the reference has already been resolved and stored in memory. Returning the cached property directly avoids redundant asynchronous loading steps, making repeated calls fast and efficient.

```tsx
import type { QRL } from '@qwik.dev/core';
import { component$, $ } from '@qwik.dev/core';
import { resolveQrl } from '@entry-ui/qwik/resolve-qrl';

interface UsageProps {
  /**
   * The lazy-loaded action to be executed on click.
   * Passed down from the parent component as a `QRL`.
   */
  actionQrl: QRL<() => void>;
}

const Usage = component$<UsageProps>((props) => {
  const { actionQrl } = props;

  const handleClick$ = $(async () => {
    // Asynchronously resolve the `QRL` reference to get the underlying function.
    // This fetches the necessary JavaScript chunk if it hasn't been loaded yet.
    const action = await resolveQrl(actionQrl);

    // Invoke the resolved function once it is safely available.
    // Executes the lazy-loaded code seamlessly.
    action();
  });

  return <button onClick$={handleClick$}>Click to trigger action</button>;
});
```

## API reference

The `resolveQrl` utility provides a type-safe way to simplify the process of getting the actual value from a `QRL` reference. Below are the specifications for the input parameters and the resulting return value.

### Parameters

The `resolveQrl` function accepts a single required parameter (marked with an asterisk `*`) representing the QRL reference to be resolved:

| Parameter | Type     | Default | Description                                                         |
| :-------- | :------- | :------ | :------------------------------------------------------------------ |
| `qrl*`    | `QRL<T>` | `—`     | The `QRL` reference to resolve into its underlying value or symbol. |

### Returns

The `resolveQrl` function returns a promise that resolves to the underlying value or symbol of the `QRL`:

| Type         | Description                                                                                                                               |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<T>` | A promise that resolves to the target resource once the lazy-loading operation completes or returns the cached value if already resolved. |
