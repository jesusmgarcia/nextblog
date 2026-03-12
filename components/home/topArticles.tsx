import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

const articles = [
  {
    id: 0,
    title: 'Title 1',
    author: {
      name: 'Author 1',
      imageUrl:
        'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    featuredImage:
      'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    createdAt: Date.now(),
  },
  {
    id: 1,
    title: 'Title 2',
    author: {
      name: 'Author 2',
      imageUrl:
        'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    featuredImage:
      'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: 'Title 3',
    author: {
      name: 'Author 3',
      imageUrl:
        'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    featuredImage:
      'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    createdAt: Date.now(),
  },
];

const TopArticles = () => {
  return (
    <section className='relative py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
            Featured Articles
          </h2>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Discover our most popular and trending content
          </p>
        </div>

        {/* Top Articles */}
        <Suspense fallback={<h1>Loading....</h1>}>
          <div className='grid m-4 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {articles.slice(0, 3).map((article) => (
              <Card
                key={article.id}
                className={cn(
                  'group relative overflow-hidden transition-all hover:scale-[1.02]',
                  'border border-gray-200/50 dark:border-white/10',
                  'bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg',
                )}
              >
                <div className='p-6'>
                  <Link href={`/articles/${article.id}`}>
                    {/* Image Container */}
                    <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
                      <Image
                        src={article.featuredImage as string}
                        alt={article.title}
                        fill
                        className='object-cover'
                      />
                    </div>

                    {/* Author Info */}
                    <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={article.author.imageUrl as string} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{article.author.name}</span>
                    </div>

                    {/* Article Title */}
                    <h3 className='mt-4 text-xl font-semibold text-gray-900 dark:text-white'>
                      {article.title}
                    </h3>
                    <p className='mt-2 text-gray-600 dark:text-gray-300'>{article.category}</p>

                    {/* Article Meta Info */}
                    <div className='mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                      <span>{new Date(article.createdAt).toDateString()}</span>
                      <span>{12} min read</span>
                    </div>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Suspense>

        <div className='mt-12 text-center'>
          <Link href={'/articles'}>
            <Button
              variant='outline'
              className='rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900'
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopArticles;
