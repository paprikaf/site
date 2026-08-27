import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/writing/$slug')({
  beforeLoad: ({ params }) => {
    if (params.slug === 'academy-case-study') {
      throw redirect({ href: 'https://academy.builder.io' });
    }

    throw redirect({ to: '/' });
  },
});
