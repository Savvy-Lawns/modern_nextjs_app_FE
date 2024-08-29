// src/hocs/withClientSideCheck.js
import React, { useEffect, useState } from 'react';

const withClientSideCheck = (WrappedComponent: any) => {
  return (props:any) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null; // or a loading spinner, or some fallback UI
    }

    return <WrappedComponent {...props} />;
  };
};

export default withClientSideCheck;