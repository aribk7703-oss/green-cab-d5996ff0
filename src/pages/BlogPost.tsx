import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { USE_MOCK_API } from '@/lib/api/mock';
import { mockBlogService } from '@/lib/api/mock/mockBlogService';
import { blogService } from '@/lib/api/services/blog.service';
import type { BlogPost as BlogPostType } from '@/lib/api/types';

// Calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        return;
      }
      
      setIsLoading(true);
      try {
        const api = USE_MOCK_API ? mockBlogService : blogService;
        const postData = await api.getBySlug(slug);
        
        if (!postData) {
          setNotFound(true);
          return;
        }
        
        setPost(postData);
        
        // Load related posts
        const related = await api.getRelated(slug, 3);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Failed to load blog post:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPost();
  }, [slug]);

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  if (isLoading || !post) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  return (
    <MainLayout>
      {/* Hero Image */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link to="/blog">
              <Button variant="outline" size="sm" className="mb-4 bg-background/80 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author.name}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt && format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {calculateReadTime(post.content)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigator.share?.({ title: post.title, url: shareUrl })}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                  if (match) {
                    return (
                      <div key={index} className="flex gap-2 my-2">
                        <span className="text-primary">•</span>
                        <span><strong className="text-foreground">{match[1]}:</strong> {match[2]}</span>
                      </div>
                    );
                  }
                }
                if (line.startsWith('- ')) {
                  return (
                    <div key={index} className="flex gap-2 my-2">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{line.replace('- ', '')}</span>
                    </div>
                  );
                }
                if (line.match(/^\d+\.\s/)) {
                  return (
                    <div key={index} className="flex gap-3 my-2">
                      <span className="text-primary font-semibold">{line.match(/^\d+/)?.[0]}.</span>
                      <span className="text-muted-foreground">{line.replace(/^\d+\.\s/, '')}</span>
                    </div>
                  );
                }
                if (line.startsWith('|')) {
                  return null; // Skip table rows for now
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return <p key={index} className="my-4 text-muted-foreground leading-relaxed">{line}</p>;
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 md:p-8 bg-primary/5 rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Ready to Explore?
              </h3>
              <p className="text-muted-foreground mb-4">
                Let Green Cab help you plan your perfect trip. Contact us for customized tour packages.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/tours">
                  <Button>Browse Tours</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link key={relatedPost._id} to={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {calculateReadTime(relatedPost.content)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
