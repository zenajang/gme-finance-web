import type { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className = '', children }: ContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-content px-10 max-lg:px-7 max-md:px-5 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
