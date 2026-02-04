import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { USE_MOCK_API } from '@/lib/api/mock';
import { mockUploadService } from '@/lib/api/mock/mockUploadService';
import { uploadService } from '@/lib/api/services/upload.service';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
}

export function MultiImageUpload({ 
  value = [], 
  onChange, 
  label = 'Images',
  maxImages = 10
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const api = USE_MOCK_API ? mockUploadService : uploadService;

  const handleFiles = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('Please select image files');
      return;
    }

    const remainingSlots = maxImages - value.length;
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = imageFiles.slice(0, remainingSlots);
    if (filesToUpload.length < imageFiles.length) {
      toast.warning(`Only ${filesToUpload.length} images will be uploaded (max ${maxImages})`);
    }

    setIsUploading(true);
    try {
      const results = await api.uploadMultiple(filesToUpload);
      const newUrls = results.map(r => r.url);
      onChange([...value, ...newUrls]);
      toast.success(`${newUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  }, [api, onChange, value, maxImages]);

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

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {value.map((image, index) => (
          <div key={index} className="group relative aspect-video overflow-hidden rounded-lg border bg-muted">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
            {index === 0 && (
              <span className="absolute left-1 top-1 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                Cover
              </span>
            )}
          </div>
        ))}
        
        {value.length < maxImages && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={cn(
              "flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
              isUploading && "pointer-events-none opacity-60"
            )}
          >
            {isUploading ? (
              <div className="text-center">
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                <span className="mt-1 block text-xs text-muted-foreground">Uploading...</span>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                <span className="mt-1 block text-xs text-muted-foreground">
                  {isDragging ? 'Drop here' : 'Upload'}
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        {value.length}/{maxImages} images • First image is the cover
      </p>
    </div>
  );
}
