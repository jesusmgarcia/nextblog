import EditArticle from '@/components/articles/editArticle';
import { prisma } from '@/lib/prisma';

type EditArticleParams = {
  params: Promise<{ id: string }>;
};

const page: React.FC<EditArticleParams> = async ({ params }) => {
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
      <EditArticle article={article} />
    </div>
  );
};

export default page;
