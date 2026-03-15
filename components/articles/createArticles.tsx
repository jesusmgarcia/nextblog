'use client';
import { startTransition, SubmitEventHandler, useActionState, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { CreateArticleAction } from '@/actions/createArticle';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CreateArticles = () => {
  const [content, setContent] = useState('');
  const [formState, action, isPending] = useActionState(CreateArticleAction, { errors: {} });

  const handleSubmit: SubmitEventHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.append('content', content);

    // Clear the field if not file is specified
    const featuredImageFile = formData.get('featuredImage') as File;
    if (!featuredImageFile || featuredImageFile.size === 0) {
      formData.delete('featuredImage');
    }

    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Article Title</Label>
              <Input type='text' name='title' placeholder='Enter an article title' />
              {formState.errors.title && (
                <span className='font-medium text-sm text-red-500'>{formState.errors.title}</span>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <select
                id='category'
                name='category'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              >
                <option value=''>Select category</option>
                <option value='technology'>Technology</option>
                <option value='programming'>Programming</option>
                <option value='web-development'>Web Development</option>
              </select>
              {formState.errors.category && (
                <span className='font-medium text-sm text-red-500'>
                  {formState.errors.category}
                </span>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='featuredImage'>Featured Image</Label>
              <Input id='featuredImage' name='featuredImage' type='file' accept='image/*' />
              {formState.errors.featuredImage && (
                <span className='font-medium text-sm text-red-500'>
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>
            <div className='space-y-2'>
              <Label>Content</Label>
              <ReactQuill theme='snow' value={content} onChange={setContent} />
              {formState.errors.content && (
                <span className='font-medium text-sm text-red-500'>
                  {formState.errors.content[0]}
                </span>
              )}
            </div>
            {formState.errors.formErrors && (
              <div className='dark:bg-transparent bg-red-100 p-2 border border-red-600'>
                <span className='font-medium text-sm text-red-500'>
                  {formState.errors.formErrors}
                </span>
              </div>
            )}
            <div className='flex justify-end gap-4'>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
              <Button disabled={isPending} type='submit'>
                {isPending ? 'Loading...' : 'Publish Article'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticles;
