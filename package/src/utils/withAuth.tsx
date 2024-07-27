// withAuth.tsx
"use client";
import React, { useEffect, ComponentType } from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    useEffect(() => {
      const token = Cookie.get('token');
      if (!token) {
        Router.push('authentication/login'); 
        alert("You must be logged in to view this page.");
      }
    }, []);

    const token = Cookie.get('token') || ''; // Get the token

    // Render the wrapped component with the provided props and token
    return <WrappedComponent {...props} token={token} />;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default withAuth;