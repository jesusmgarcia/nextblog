import { ArticleDetail } from '@/components/articles/articleDetail';
import { prisma } from '@/lib/prisma';
import React from 'react';

type ArticleDetailProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleDetailProps> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  if (!article) {
    return <h1>Article not found.</h1>;
  }
  return (
    <div>
      <ArticleDetail article={article} />
    </div>
  );
};

export default page;
