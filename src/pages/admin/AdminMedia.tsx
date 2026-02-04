import { useState, useRef, useCallback, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Upload, 
  Search, 
  Trash2, 
  Copy,
  Check,
  Image as ImageIcon,
  Loader2,
  Grid,
  List,
  X,
  FolderOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { USE_MOCK_API } from '@/lib/api/mock';
import { mockUploadService } from '@/lib/api/mock/mockUploadService';
import { uploadService } from '@/lib/api/services/upload.service';
import { format } from 'date-fns';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  uploadedAt: string;
}

// In-memory storage for demo
let mediaLibrary: MediaItem[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    filename: 'taj-mahal.jpg',
    size: 245000,
    mimetype: 'image/jpeg',
    uploadedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
    filename: 'india-gate.jpg',
    size: 189000,
    mimetype: 'image/jpeg',
    uploadedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400',
    filename: 'hawa-mahal.jpg',
    size: 312000,
    mimetype: 'image/jpeg',
    uploadedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    filename: 'swift-dzire.jpg',
    size: 156000,
    mimetype: 'image/jpeg',
    uploadedAt: '2024-01-12T16:45:00Z'
  },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>(mediaLibrary);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const api = USE_MOCK_API ? mockUploadService : uploadService;

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFiles = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('Please select image files');
      return;
    }

    setIsUploading(true);
    try {
      const results = await api.uploadMultiple(imageFiles);
      const newItems: MediaItem[] = results.map((result, index) => ({
        id: 'img-' + Math.random().toString(36).substr(2, 9),
        url: result.url,
        filename: result.filename,
        size: result.size,
        mimetype: result.mimetype,
        uploadedAt: new Date().toISOString(),
      }));
      
      setMedia(prev => [...newItems, ...prev]);
      mediaLibrary = [...newItems, ...mediaLibrary];
      toast.success(`${newItems.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  }, [api]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(i => i !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredMedia.map(m => m.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDelete = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    mediaLibrary = mediaLibrary.filter(m => m.id !== id);
    setSelectedItems(prev => prev.filter(i => i !== id));
    toast.success('Image deleted');
  };

  const handleBulkDelete = () => {
    setMedia(prev => prev.filter(m => !selectedItems.includes(m.id)));
    mediaLibrary = mediaLibrary.filter(m => !selectedItems.includes(m.id));
    toast.success(`${selectedItems.length} images deleted`);
    setSelectedItems([]);
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      toast.success('URL copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground">Manage your uploaded images and files ({media.length} items)</p>
          </div>
          <Button className="gap-2" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="font-medium text-foreground">
                {isDragging ? 'Drop images here' : 'Drag and drop images here'}
              </p>
              <p className="text-sm text-muted-foreground">
                or click "Upload Images" button • PNG, JPG, GIF up to 5MB each
              </p>
            </div>
          )}
        </div>

        {/* Filters & Actions */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {selectedItems.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="gap-1">
                        <Trash2 className="h-3 w-3" />
                        Delete ({selectedItems.length})
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Selected Images</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {selectedItems.length} selected images? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBulkDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10"
                  />
                </div>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-9 w-9 rounded-r-none"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-9 w-9 rounded-l-none"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Grid/List */}
        {filteredMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <FolderOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold">No images found</h3>
            <p className="text-muted-foreground">Upload some images to get started</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border bg-muted cursor-pointer transition-all",
                  selectedItems.includes(item.id) && "ring-2 ring-primary"
                )}
                onClick={() => setPreviewItem(item)}
              >
                <img
                  src={item.url}
                  alt={item.filename}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        handleSelectItem(item.id, checked as boolean);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs text-white truncate">{item.filename}</p>
                    <p className="text-xs text-white/70">{formatFileSize(item.size)}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(item.url, item.id);
                      }}
                    >
                      {copiedId === item.id ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Image</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.filename}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left text-sm">
                      <th className="p-4">
                        <Checkbox 
                          checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-4 font-medium text-muted-foreground">Image</th>
                      <th className="p-4 font-medium text-muted-foreground">Filename</th>
                      <th className="p-4 font-medium text-muted-foreground">Size</th>
                      <th className="p-4 font-medium text-muted-foreground">Uploaded</th>
                      <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedia.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b transition-colors hover:bg-muted/30 cursor-pointer"
                        onClick={() => setPreviewItem(item)}
                      >
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <Checkbox 
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="h-12 w-16 overflow-hidden rounded bg-muted">
                            <img
                              src={item.url}
                              alt={item.filename}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-foreground">{item.filename}</p>
                          <p className="text-xs text-muted-foreground">{item.mimetype}</p>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatFileSize(item.size)}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {format(new Date(item.uploadedAt), 'MMM dd, yyyy')}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyUrl(item.url, item.id)}
                            >
                              {copiedId === item.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Image</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{item.filename}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item.id)}>
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
            </CardContent>
          </Card>
        )}

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing {filteredMedia.length} of {media.length} images
            {selectedItems.length > 0 && ` (${selectedItems.length} selected)`}
          </p>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewItem?.filename}</DialogTitle>
            <DialogDescription>
              {previewItem && `${formatFileSize(previewItem.size)} • ${previewItem.mimetype}`}
            </DialogDescription>
          </DialogHeader>
          
          {previewItem && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg bg-muted">
                <img
                  src={previewItem.url}
                  alt={previewItem.filename}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  value={previewItem.url}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={() => handleCopyUrl(previewItem.url, previewItem.id)}>
                  {copiedId === previewItem.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
