import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash2, FolderOpen, Plus } from 'lucide-react';
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
import { Link } from '@inertiajs/react';
import { index, store, update, destroy, show } from '@/routes/admin/gallery-groups';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Galleries',
        href: '/admin/galleries/gallery-groups',
    },
];

type GalleryGroup = {
    id: number;
    name: string;
    slug: string;
    galleries_count: number;
};

export default function GalleryIndexPage({
    groups,
}: {
    groups: GalleryGroup[];
}) {
    const { props } = usePage<any>();
    const success = props.flash?.success;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<GalleryGroup | null>(null);
    const [deletingGroup, setDeletingGroup] = useState<GalleryGroup | null>(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        createForm.post(store.url(), {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                createForm.reset();
            },
        });
    }

    function handleEdit(group: GalleryGroup) {
        setEditingGroup(group);
        editForm.setData({
            name: group.name,
        });
        setIsEditDialogOpen(true);
    }

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!editingGroup) return;

        editForm.put(update.url(editingGroup.id), {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setEditingGroup(null);
            },
        });
    }

    function handleDelete(group: GalleryGroup) {
        setDeletingGroup(group);
        setIsDeleteDialogOpen(true);
    }

    function confirmDelete() {
        if (!deletingGroup) return;

        router.delete(destroy.url(deletingGroup.id), {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setDeletingGroup(null);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galleries" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Gallery Groups"
                        description="Manage groups of images for different sections of the site"
                    />
                    <Dialog
                        open={isCreateDialogOpen}
                        onOpenChange={setIsCreateDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Group
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <form onSubmit={handleCreate}>
                                <DialogHeader>
                                    <DialogTitle>Add Gallery Group</DialogTitle>
                                    <DialogDescription>
                                        Create a new group to organize your images.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Group Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g., Trellis Gates"
                                            value={createForm.data.name}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={createForm.processing}>
                                        {createForm.processing ? 'Creating...' : 'Create'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Images</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groups.map((group) => (
                                <TableRow key={group.id}>
                                    <TableCell className="font-medium">{group.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{group.slug}</TableCell>
                                    <TableCell>{group.galleries_count} images</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link href={show.url(group.id)}>
                                                    <FolderOpen className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(group)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(group)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {groups.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No gallery groups found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <form onSubmit={handleUpdate}>
                            <DialogHeader>
                                <DialogTitle>Edit Group</DialogTitle>
                                <DialogDescription>
                                    Update the name of this gallery group.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Group Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(e) =>
                                            editForm.setData('name', e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={editForm.processing}>
                                    {editForm.processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Group</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete "{deletingGroup?.name}"? 
                                This will also delete all images within this group.
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
                            >
                                Delete
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
