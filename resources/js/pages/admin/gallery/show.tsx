import type {
    DragEndEvent} from '@dnd-kit/core';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import {
    GripVertical,
    Trash2,
    Upload,
    AlertTriangle,
    Loader2,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { upload, reorder } from '@/routes/admin/gallery-groups';
import { destroy, bulkDestroy } from '@/routes/admin/gallery-items';
import type { BreadcrumbItem } from '@/types';

type UploadItem = {
    file: File;
    id: string;
    progress: number;
    error?: string;
};

type Media = {
    id: number;
    original_url: string;
    preview_url: string;
    name: string;
};

type GalleryItem = {
    id: number;
    order_column: number;
    media: Media[];
};

type GalleryGroup = {
    id: number;
    name: string;
    slug: string;
    galleries: GalleryItem[];
};

function SortableImage({
    item,
    onDelete,
    isSelected,
    onSelect,
}: {
    item: GalleryItem;
    onDelete: (id: number) => void;
    isSelected: boolean;
    onSelect: (id: number, selected: boolean) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const imageUrl = item.media[0]?.original_url || '';

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative aspect-square overflow-hidden rounded-lg border bg-muted ${
                isDragging ? 'opacity-50 ring-2 ring-primary' : ''
            }`}
        >
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />

            {/* Selection Checkbox */}
            <div
                className={`absolute top-2 right-2 z-10 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelect(item.id, !!checked)}
                    className="h-5 w-5 bg-white/80 data-[state=checked]:bg-primary"
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab touch-none rounded-full bg-white p-2 text-black hover:bg-gray-100"
                    title="Drag to reorder"
                >
                    <GripVertical className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(item.id)}
                    className="rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                    title="Delete image"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

export default function GalleryShowPage({ group }: { group: GalleryGroup }) {
    const [items, setItems] = useState(group.galleries);
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const { props } = usePage<any>();
    const success = props.flash?.success;

    useEffect(() => {
        setItems(group.galleries);
    }, [group.galleries]);

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 0) return;

            const newUploads: UploadItem[] = acceptedFiles.map((file) => ({
                file,
                id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
                progress: 0,
            }));

            setUploads((prev) => [...prev, ...newUploads]);

            newUploads.forEach((uploadItem) => {
                const formData = new FormData();
                formData.append('images[]', uploadItem.file);

                axios
                    .post(upload.url(group.id), formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent) => {
                            const progress = progressEvent.total
                                ? Math.round(
                                      (progressEvent.loaded * 100) /
                                          progressEvent.total,
                                  )
                                : 0;
                            setUploads((prev) =>
                                prev.map((u) =>
                                    u.id === uploadItem.id
                                        ? { ...u, progress }
                                        : u,
                                ),
                            );
                        },
                    })
                    .then(() => {
                        setUploads((prev) =>
                            prev.filter((u) => u.id !== uploadItem.id),
                        );
                        router.reload({ only: ['group'] });
                    })
                    .catch((error) => {
                        const errorMessage =
                            error.response?.data?.message || 'Upload failed';
                        setUploads((prev) =>
                            prev.map((u) =>
                                u.id === uploadItem.id
                                    ? { ...u, error: errorMessage }
                                    : u,
                            ),
                        );
                        toast.error(errorMessage);
                    });
            });
        },
        [group.id],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);

            router.post(
                reorder.url(group.id),
                {
                    order: newItems.map((i) => i.id),
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Images reordered');
                    },
                },
            );
        }
    }

    function handleDelete(id: number) {
        setIdsToDelete([id]);
        setIsConfirmOpen(true);
    }

    function handleBulkDelete() {
        if (selectedIds.length === 0) return;
        setIdsToDelete(selectedIds);
        setIsConfirmOpen(true);
    }

    function confirmDelete() {
        if (idsToDelete.length === 0) return;
        setIsDeleting(true);

        if (idsToDelete.length === 1) {
            router.delete(destroy.url(idsToDelete[0]), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Image deleted');
                    setIsConfirmOpen(false);
                    setIdsToDelete([]);
                    setSelectedIds((prev) =>
                        prev.filter((id) => id !== idsToDelete[0]),
                    );
                },
                onFinish: () => setIsDeleting(false),
            });
        } else {
            router.post(
                bulkDestroy.url(),
                {
                    ids: idsToDelete,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Images deleted');
                        setIsConfirmOpen(false);
                        setIdsToDelete([]);
                        setSelectedIds([]);
                    },
                    onFinish: () => setIsDeleting(false),
                },
            );
        }
    }

    const toggleSelect = useCallback((id: number, selected: boolean) => {
        setSelectedIds((prev) =>
            selected ? [...prev, id] : prev.filter((i) => i !== id),
        );
    }, []);

    const toggleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(items.map((i) => i.id));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Galleries',
            href: '/admin/galleries/gallery-groups',
        },
        {
            title: group.name,
            href: `/admin/galleries/gallery-groups/${group.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Gallery: ${group.name}`} />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title={group.name}
                        description={`Manage images in the ${group.name} gallery.`}
                    />

                    {items.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleSelectAll}
                            >
                                {selectedIds.length === items.length
                                    ? 'Deselect All'
                                    : 'Select All'}
                            </Button>
                            {selectedIds.length > 0 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Selected ({selectedIds.length})
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {uploads.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {uploads.map((upload) => (
                            <div
                                key={upload.id}
                                className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-4"
                            >
                                <div className="flex items-center justify-between text-xs">
                                    <span className="truncate font-medium">
                                        {upload.file.name}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {upload.error
                                            ? 'Error'
                                            : `${upload.progress}%`}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full transition-all duration-300 ${
                                            upload.error
                                                ? 'bg-destructive'
                                                : 'bg-primary'
                                        }`}
                                        style={{ width: `${upload.progress}%` }}
                                    />
                                </div>
                                {upload.error && (
                                    <span className="text-xs text-destructive">
                                        {upload.error}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Section */}
                <div
                    {...getRootProps()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
                        isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                    }`}
                >
                    <input {...getInputProps()} />
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        {isDragActive
                            ? 'Drop the files here...'
                            : 'Drag & drop images here, or click to select files'}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/60">
                        Supports: JPG, PNG, WEBP (Max 5MB each)
                    </p>
                </div>

                {/* Gallery Grid */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items.map((i) => i.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {items.map((item) => (
                                <SortableImage
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDelete}
                                    isSelected={selectedIds.includes(item.id)}
                                    onSelect={toggleSelect}
                                />
                            ))}
                            {items.length === 0 && (
                                <div className="col-span-full py-20 text-center text-muted-foreground">
                                    No images found in this gallery. Upload some
                                    above!
                                </div>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>

                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                Confirm Deletion
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete{' '}
                                {idsToDelete.length === 1
                                    ? 'this image'
                                    : `${idsToDelete.length} images`}
                                ? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsConfirmOpen(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

// @ts-ignore
declare const route: any;
