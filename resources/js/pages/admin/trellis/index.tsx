import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors

} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Page, PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Trellis',
        href: '/admin/trellis',
    },
];

type TrellisItem = {
    id: number;
    width: string;
    drop: string;
    price: string;
    order_column: number;
};

interface PageProps extends InertiaPageProps {
    flash?: {
        success?: string;
    };
    trellisItems: TrellisItem[];
}

function SortableRow({
    item,
    onEdit,
    onDelete,
}: {
    item: TrellisItem;
    onEdit: (item: TrellisItem) => void;
    onDelete: (item: TrellisItem) => void;
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
    };

    return (

        <TableRow
            ref={setNodeRef}
            style={style}
            data-state={item.order_column}
            data-dragging={isDragging}
        >
            <TableCell>
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab touch-none"
                >
                    <GripVertical className="h-4 w-4" />
                </button>
            </TableCell>
            <TableCell>{item.width}</TableCell>
            <TableCell>{item.drop}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}



export default function TrellisIndexPage({
    trellisItems,
}: {
    trellisItems: TrellisItem[];
}) {
    const { props } = usePage<PageProps>();
    const success = props.flash?.success;

    const [items, setItems] = useState(trellisItems);

    useEffect(() => {
        setItems(trellisItems);
    }, [trellisItems]);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TrellisItem | null>(null);
    const [deletingItem, setDeletingItem] = useState<TrellisItem | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const createForm = useForm({
        width: '',
        drop: '',
        price: '',
    });

    const editForm = useForm({
        width: '',
        drop: '',
        price: '',
    });

    const deleteForm = useForm({});

    if (success) {
        toast.success(success);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            
            const newItems = arrayMove(items, oldIndex, newIndex).map(
                (item: TrellisItem, index: number) => ({
                    ...item,
                    order_column: index + 1,
                }),
            );

            setItems(newItems);

            router.post(
                '/admin/trellis/reorder',
                {
                    order: newItems.map((item) => ({
                        id: item.id,
                        order_column: item.order_column,
                    })),
                },
                {
                    preserveScroll: true,
                    only: ['trellisItems'], // Request only this prop from the server
                    onSuccess: (page: any) => {
                        setItems(page.props.trellisItems);
                        toast.success('Trellis items reordered successfully.'); // Show toast on success
                    },
                }
            );
        }
    }

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        createForm.post('/admin/trellis', {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                createForm.reset();
            },
        });
    }

    function handleEdit(item: TrellisItem) {
        setEditingItem(item);
        editForm.setData({
            width: item.width,
            drop: item.drop,
            price: item.price,
        });
        setIsEditDialogOpen(true);
    }

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!editingItem) return;

        editForm.put(`/admin/trellis/${editingItem.id}`, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setEditingItem(null);
            },
        });
    }

    function handleDelete(item: TrellisItem) {
        setDeletingItem(item);
        setIsDeleteDialogOpen(true);
    }

    function confirmDelete() {
        if (!deletingItem) return;

        deleteForm.delete(`/admin/trellis/${deletingItem.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setDeletingItem(null);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Trellis" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Trellis"
                        description="Manage trellis sizes and pricing"
                    />
                    <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>Add Trellis</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleCreate}>
                                <DialogHeader>
                                    <DialogTitle>Add Trellis</DialogTitle>
                                    <DialogDescription>
                                        Add a new trellis size and price.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="width">Width</Label>
                                        <Input
                                            id="width"
                                            placeholder="e.g., 900mm"
                                            value={createForm.data.width}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'width',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="drop">Drop</Label>
                                        <Input
                                            id="drop"
                                            placeholder="e.g., 2100mm"
                                            value={createForm.data.drop}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'drop',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            placeholder="e.g., R 3,800"
                                            value={createForm.data.price}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'price',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10"></TableHead>
                                    <TableHead>Width</TableHead>
                                    <TableHead>Drop</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <SortableContext
                                    items={items.map((i) => i.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {items.map((item) => (
                                        <SortableRow
                                            key={item.id}
                                            item={item}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </SortableContext>
                            </TableBody>
                        </Table>
                    </div>
                </DndContext>

                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent>
                        <form onSubmit={handleUpdate}>
                            <DialogHeader>
                                <DialogTitle>Edit Trellis</DialogTitle>
                                <DialogDescription>
                                    Update trellis size and price.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-width">Width</Label>
                                    <Input
                                        id="edit-width"
                                        value={editForm.data.width}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'width',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-drop">Drop</Label>
                                    <Input
                                        id="edit-drop"
                                        value={editForm.data.drop}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'drop',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Price</Label>
                                    <Input
                                        id="edit-price"
                                        value={editForm.data.price}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'price',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Trellis</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this trellis?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                                disabled={deleteForm.processing}
                            >
                                {deleteForm.processing ? 'Deleting...' : 'Delete'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
