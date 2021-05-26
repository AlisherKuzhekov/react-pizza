import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      speed={2}
      width={320}
      height={530}
      viewBox="0 0 320 530"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="150" cy="120" r="120" />
      <rect x="1" y="270" rx="5" ry="5" width="300" height="25" />
      <rect x="0" y="310" rx="6" ry="6" width="300" height="84" />
      <rect x="0" y="420" rx="3" ry="3" width="105" height="31" />
      <rect x="155" y="412" rx="20" ry="20" width="145" height="44" />
    </ContentLoader>
  );
}

export default LoadingBlock;
