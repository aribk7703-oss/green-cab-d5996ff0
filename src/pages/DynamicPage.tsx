import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Page } from '@/lib/api/types/page';
import { USE_MOCK_API } from '@/lib/api/config';
import { mockPagesService } from '@/lib/api/mock/mockPagesService';
import { pagesService } from '@/lib/api/services/pages.service';
import { Skeleton } from '@/components/ui/skeleton';

interface DynamicPageProps {
  slug?: string;
}

const DynamicPage = ({ slug: propSlug }: DynamicPageProps) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const slug = propSlug || paramSlug;
  
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const service = USE_MOCK_API ? mockPagesService : pagesService;
        const fetchedPage = await service.getBySlug(slug);
        
        if (!fetchedPage) {
          setError('Page not found');
          return;
        }
        
        if (fetchedPage.status !== 'published') {
          setError('This page is not available');
          return;
        }
        
        setPage(fetchedPage);
        
        // Update document title
        if (fetchedPage.metaTitle) {
          document.title = fetchedPage.metaTitle;
        }
      } catch (err) {
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <Skeleton className="mb-6 h-12 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-5/6" />
            <Skeleton className="mb-8 h-4 w-4/6" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !page) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">Page Not Found</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              {error || 'The page you are looking for does not exist.'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="text-lg text-muted-foreground">{page.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <article 
            className={`mx-auto ${
              page.template === 'full-width' ? 'max-w-6xl' : 'max-w-4xl'
            }`}
          >
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>
        </div>
      </section>

      {/* Last Updated */}
      <section className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-sm text-muted-foreground">
            Last updated: {new Date(page.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DynamicPage;
