import React from 'react';
import Link from 'next/link';

export type MyLinkProps = {
  href: string;
  children: React.ReactNode;
  as?: 'navlink' | 'link' | 'newtab';
  className?: string | ((prop: { isActive: boolean }) => string);
  onClick?: () => void;
};

const MyLink = ({
  children,
  href,
  as: asof = 'link',
  ...props
}: MyLinkProps) => {
  return (
    <Link href={href}>
      <a className={props.className as string}>{children}</a>
    </Link>
  );
};

export default MyLink;
