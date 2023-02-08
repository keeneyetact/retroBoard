import { lazy, Suspense } from 'react';

const IconInner = lazy(() => import('./IconInner'));

type IconProps = {
  icon: string | null;
  size?: number;
};

export default function Icon(props: IconProps) {
  return (
    <Suspense fallback={<span />}>
      <IconInner {...props} />
    </Suspense>
  );
}
