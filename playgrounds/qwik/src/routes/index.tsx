import type { DocumentHead } from '@qwik.dev/router';
import { component$ } from '@qwik.dev/core';
import { Test } from '@/components/test';

export default component$(() => {
  return <Test />;
});

export const head: DocumentHead = {
  title: 'Entry UI Qwik Playground',
};
