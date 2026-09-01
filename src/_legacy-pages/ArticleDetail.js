import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();

  return (
    <div className="article-detail-page">
      <div className="container-custom section-padding">
        <h1>Artículo #{id}</h1>
        <p>Detalle del artículo en construcción...</p>
      </div>
    </div>
  );
};

export default ArticleDetail;
