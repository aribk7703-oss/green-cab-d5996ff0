import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Loader2,
  FileText,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { USE_MOCK_API } from '@/lib/api/mock';
import { mockBlogService } from '@/lib/api/mock/mockBlogService';
import { blogService } from '@/lib/api/services/blog.service';
import type { BlogPost, BlogFormData } from '@/lib/api/types';
import { format } from 'date-fns';

const categories = ['Heritage', 'Destinations', 'Pilgrimage', 'Travel Tips', 'Culture'];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Destinations',
    tags: [],
    isPublished: false,
    seo: { title: '', description: '', keywords: [] }
  });
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const api = USE_MOCK_API ? mockBlogService : blogService;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAll();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      await api.delete(id);
      setPosts(prev => prev.filter(p => p._id !== id));
      setSelectedPosts(prev => prev.filter(postId => postId !== id));
      toast.success(`"${title}" has been deleted`);
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(filteredPosts.map(p => p._id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts(prev => [...prev, postId]);
    } else {
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedPosts.length === 0) return;
    
    if (bulkAction === 'delete') {
      for (const id of selectedPosts) {
        const post = posts.find(p => p._id === id);
        if (post) {
          await handleDelete(id, post.title);
        }
      }
      setSelectedPosts([]);
      setBulkAction('');
    } else if (bulkAction === 'publish' || bulkAction === 'unpublish') {
      const isPublished = bulkAction === 'publish';
      for (const id of selectedPosts) {
        await api.togglePublish(id, isPublished);
      }
      await loadPosts();
      setSelectedPosts([]);
      setBulkAction('');
      toast.success(`Posts ${isPublished ? 'published' : 'unpublished'}`);
    }
  };

  const openCreateDialog = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: 'Destinations',
      tags: [],
      isPublished: false,
      seo: { title: '', description: '', keywords: [] }
    });
    setTagsInput('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category,
      tags: post.tags,
      isPublished: post.isPublished,
      seo: post.seo
    });
    setTagsInput(post.tags.join(', '));
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    setIsSaving(true);
    try {
      const dataToSave = {
        ...formData,
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      };
      
      if (editingPost) {
        await api.update(editingPost._id, dataToSave);
        toast.success('Blog post updated');
      } else {
        await api.create(dataToSave);
        toast.success('Blog post created');
      }
      
      setIsDialogOpen(false);
      await loadPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
      toast.error('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await api.togglePublish(id, !currentStatus);
      await loadPosts();
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground">Manage your blog articles ({posts.length} total)</p>
          </div>
          <Button className="gap-2" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Add New Post
          </Button>
        </div>

        {/* Filters & Actions */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delete">Delete Selected</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                    <SelectItem value="unpublish">Unpublish</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedPosts.length === 0}
                >
                  Apply
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-sm">
                    <th className="p-4">
                      <Checkbox 
                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-4 font-medium text-muted-foreground">Title</th>
                    <th className="p-4 font-medium text-muted-foreground">Category</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Published</th>
                    <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="border-b transition-colors hover:bg-muted/30">
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedPosts.includes(post._id)}
                          onCheckedChange={(checked) => handleSelectPost(post._id, checked as boolean)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 overflow-hidden rounded-lg bg-muted">
                            {post.coverImage ? (
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{post.category}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={post.isPublished ? "default" : "secondary"}
                          className={post.isPublished ? "bg-primary cursor-pointer" : "cursor-pointer"}
                          onClick={() => handleTogglePublish(post._id, post.isPublished)}
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {post.publishedAt ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          {post.isPublished && (
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => openEditDialog(post)}
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                disabled={deletingId === post._id}
                              >
                                {deletingId === post._id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post._id, post.title)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No blog posts found</p>
                <Button variant="outline" className="mt-4" onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first post
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination info */}
        {filteredPosts.length > 0 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Showing {filteredPosts.length} of {posts.length} posts
              {selectedPosts.length > 0 && ` (${selectedPosts.length} selected)`}
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            <DialogDescription>
              {editingPost ? 'Update your blog post details.' : 'Add a new blog post to your website.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief summary of the post"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Write your blog post content here..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Travel, Adventure, Tips"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked as boolean }))}
                />
                <Label htmlFor="isPublished" className="cursor-pointer">Publish immediately</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPost ? 'Update Post' : 'Create Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
