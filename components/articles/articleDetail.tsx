import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Prisma } from '@/app/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import CommentForm from '../comments/commentForm';
import CommentList from '../comments/commentList';
import LikeButton from '../likes/likeButton';
import Image from 'next/image';
import { Badge } from '../ui/badge';

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

export async function ArticleDetail({ article }: ArticleDetailPageProps) {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
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

  const likes = await prisma.like.findMany({ where: { articleId: article.id } });
  const { userId } = await auth();
  const user = await prisma.user.findUnique({ where: { clerkUserId: userId as string } });

  const isLiked = likes.some((like) => like.userId === user?.id);

  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  const cleanContent = purify.sanitize(article.content);

  return (
    <div className='min-h-screen bg-background'>
      {/* Reuse your existing Navbar */}

      <main className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <article className='mx-auto max-w-3xl'>
          {/* Article Header */}
          <header className='mb-12'>
            <div className='relative mb-4 h-96 w-full overflow-hidden rounded-xl'>
              <Image
                src={article.featuredImage as string}
                alt={article.title}
                fill
                className='object-cover'
              />
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-foreground mb-4'>
              {article.title}
            </h1>

            <div className='flex justify-between'>
              <div className='flex items-center gap-4 text-muted-foreground'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>{article.id}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium text-foreground'>{article.author.name}</p>
                  <p className='text-sm'>
                    {article.createdAt.toDateString()} · {12} min read
                  </p>
                </div>
              </div>
              <div className='mb-4'>
                <Badge variant='secondary' className='mt-4'>
                  {article.category}
                </Badge>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className='prose prose-lg dark:prose-invert max-w-none mb-12'
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          {/* Article Actions */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

          {/* Comments Section */}
          <Card className='p-6'>
            <div className='flex items-center gap-2 mb-8'>
              <MessageCircle className='h-6 w-6 text-primary' />
              <h2 className='text-2xl font-semibold text-foreground'>{comments.length} Comments</h2>
            </div>

            {/* Comment Form */}
            <CommentForm articleId={article.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
}
